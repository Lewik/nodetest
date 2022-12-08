var express = require('express');
var router = express.Router();
const {crc64} = require("crc64-ecma182");
const crypto = require('crypto');
const keys = require("./keys")

router.post('/', function (req, res, next) {
    const verify = crypto.createVerify('SHA256');
    const data = req.body.data;
    const crc = crc64(new Buffer(data + keys.salt))
    verify.update(crc);
    verify.end();
    const result = verify.verify(keys.publicKey, req.body.signature, "base64")

    res
        .status(200)
        .send(result);

});

module.exports = router;
