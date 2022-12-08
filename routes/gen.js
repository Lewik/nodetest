var express = require('express');
var router = express.Router();
const crypto = require('crypto');

router.post('/', function (req, res, next) {
    crypto.generateKeyPair('rsa', {
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
    }, (err, publicKey, privateKey) => {
        console.log( publicKey, privateKey)
        if (err) {
            res
                .status(500)
                .send({
                    error: err
                })
        } else {
            res
                .send({
                    publicKey: publicKey,
                    privateKey: privateKey
                })
        }
    });

});

module.exports = router;
