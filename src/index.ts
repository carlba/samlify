import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as saml from 'passport-saml';
import * as fs from "fs";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));

passport.serializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

const samlStrategy = new saml.Strategy({
    callbackUrl: 'http://localhost/login/callback',
    entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    issuer: 'saml-poc',
    identifierFormat: undefined,
    decryptionPvk: fs.readFileSync(__dirname + '/certs/key.pem', 'utf8'),
    privateCert: fs.readFileSync(__dirname + '/certs/key.pem', 'utf8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true
}, function(profile: any, done: any) {
    return done(null, profile);
});

passport.use('samlStrategy', samlStrategy);

app.use(passport.initialize());
app.use(passport.session());

app.get('/login',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login handler');
        next();
    },
    passport.authenticate('samlStrategy'),
);

app.post('/login/callback',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.send('Log in Callback Success');
    }
);

app.get('/metadata',
    function(req, res) {
        res.type('application/xml');
        res.status(200).send(
            samlStrategy.generateServiceProviderMetadata(
                fs.readFileSync(__dirname + '/certs/cert.pem', 'utf8'),
                fs.readFileSync(__dirname + '/certs/cert.pem', 'utf8')
            )
        );
    }
);

app.get('/',
    function(req, res) {
        res.send('Test Home Page');
    }
);

function main() {
    const port = 4300;
    app.listen(4300);
    console.log(`Listening on port ${port}`)
}

main()

