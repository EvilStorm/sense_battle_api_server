const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');

var {sequelize, term, notify, app_version} = require('../models');
var {getAppStartNotifyList} = require('./collector/notify');
var {getTerm} = require('./collector/term');
var {getAppVersion} = require('./collector/app_version');

router.get('/', async function (req, res) {

    var result = await getAppStartNotifyList(0);
    console.log(result);
    res.json(response.success(result));

});

router.get('/notify/:notify/appVer/:appVer/term/:term', async function (req, res) {

    try {
        var notifies = await getAppStartNotifyList(req.params.notify);
        var appVer = await getAppVersion(req.params.appVer);
        var term = await getTerm(req.params.term);
        
        var result = {
            notifies: notifies,
            appVer: appVer,
            term: term
        }
        res.json(response.success(result));
    } catch (e) {
        res.json(response.fail(e));
    }


});

module.exports = router;