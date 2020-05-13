#/bin/bash
mkdir -p src/certs
openssl req -x509 -newkey rsa:4096 -keyout src/certs/key.pem -out src/certs/cert.pem -nodes -days 900
read -n 5000 -p 'IDP certificate (can usually be found at metadata endpoint <SERVER_URI>simplesaml/saml2/idp/metadata.php for simplesaml)' idk_key
echo $idk_key > src/certs/idk_key.pem
