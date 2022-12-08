var express = require('express');
var router = express.Router();
const crypto = require('crypto');
/* GET home page. */
router.post('/', function (req, res, next) {

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            // cipher: 'aes-256-cbc',
            // passphrase: 'top secret'
        }
    });

    const sign = crypto.createSign('SHA256');
    sign.update('some data to sign');
    sign.end();
    const signature = sign.sign(privateKey, "base64");

    const verify = crypto.createVerify('SHA256');
    verify.update('some data to sign');
    verify.end();

    console.log(privateKey, publicKey)
    console.log(signature)
    console.log(verify.verify(publicKey, signature, "base64"));

    res.send()
});

module.exports = router;
