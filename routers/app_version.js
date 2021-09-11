const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');
const auth = require('../components/Auth');
var {getAppVersion, } = require('./collector/app_version');

var {sequelize, app_version, } = require('../models');
var {Op} = require('sequelize');


router.post('', auth.isAdmin, async function(req, res) {

    console.log("post body: ")
    console.log(req.body)

    const result = await app_version.create(req.body);

    if(result != null) {
        res.json(response.success(result)); 
    } else {
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));
    }
    
});

router.get('', async function(req, res) {
    app_version.findAll({
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.get('/:id', async function(req, res) {
    app_version.findOne({
        where: {id: req.params.id}
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.get('/after/:currentVersion', async function(req, res){
    console.log(`req.params.id: ${req.params.currentVersion}`)
    try {
        var result = await getAppVersion(req.params.currentVersion);
        res.json(response.success(result));
    } catch (e) {
        res.json(response.fail(e));

    }
});

router.patch('/:id', function(req, res) {
    app_version.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
            
        }
    )
    .then(_ => {
        if(_[0] == 1) {
            res.json(response.success({result: 1, message:"정보가 변경되었습니다."}));
        } else {
            var error = createException(ExceptionType.QUERY_FAIL);
            res.json(response.fail(error, error.errmsg, error.code));
        }
        
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

module.exports = router;