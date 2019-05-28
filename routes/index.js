const express = require('express');
const log = require('../model/log').db;
const router = express.Router();

/* GET home page. */
router.all('/cyberPunk/:tag', async (req, res, next) => {
    //console.log(req.params.tag);
    await log.create({
        name: req.params.tag,
        ip: req.ip,
        timestamp: new Date()
    });
    res.send({
        status: 'OK',
        statusCode: 200,
    });
});

module.exports = router;
