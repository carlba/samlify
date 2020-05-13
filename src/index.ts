import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));

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

