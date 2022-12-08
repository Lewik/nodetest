var express = require('express');
var router = express.Router();
const {crc64} = require("crc64-ecma182");
const keys = require("./keys")
const crypto = require('crypto');

router.post('/', function (req, res, next) {
    const data = req.body.data
    const crc = crc64(new Buffer(data + keys.salt))
    const sign = crypto.createSign('SHA256');
    sign.write(crc);
    sign.end();
    const signature = sign.sign(keys.privateKey, 'base64');
    res.send({signature});

});

module.exports = router;
