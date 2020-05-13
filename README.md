# Samlify

## Installation

```bash
npm install
```

## Usage

1. Ensure that a SimpleSAML provider is running in docker.

    ```bash
       npm run simplesaml:up
    ```
   
2. Then make sure the required certificates are in place. For a development scenario the `npm run certificates` can
   be used.
   
3. Start the application

    ```bash
   npm run dev
   ```
   
4. Goto http://localhost:4300/login
   You should be redirected to the login page that the simpleSaml IDP exposes and then "logged in" into
   this application.
      
## Maintaining the repo

It is important to keep the dependencies of this repo up to date. Do these steps:
 
1. First ensure that the `npm-check-updates` is installed globally

   ```bash
   npm install -g npm-check-updates
   ```
   
2. Then update the version identifiers of the `package.json` and `package-lock.json` files to the latest version: 
    
   ```bash
    ncu -u
    ```

3. Update your environment:

    ```bash
    npm update
    ```

## Tests

```sh
npm install
npm test
```

## Dependencies

None

## Dev Dependencies

- [gts](https://ghub.io/gts): Google TypeScript Style
- [typescript](https://ghub.io/typescript): TypeScript is a language for application scale JavaScript development
- [@types/node](https://ghub.io/@types/node): TypeScript definitions for Node.js

## Information
https://medium.com/disney-streaming/setup-a-single-sign-on-saml-test-environment-with-docker-and-nodejs-c53fc1a984c9

## License

MIT
