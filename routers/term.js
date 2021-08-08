const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');
const auth = require('../components/Auth');

var {sequelize, term, } = require('../models');
var {Op} = require('sequelize');


router.post('', auth.isAdmin, async function(req, res) {

    console.log("post body: ")
    console.log(req.body)

    const result = await term.create(req.body);

    if(result != null) {
        res.json(response.success(result)); 
    } else {
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));
    }
    
});

router.get('/:id', async function(req, res) {
    term.findOne({
        where: {id: req.params.id}
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.get('/after/:id', async function(req, res){
    term.findOne({
        where: {
            id: {
                [Op.gt]: req.params.id 
            },
            release: true
        },
        order: [['id', 'desc']],
        limit: 1
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.patch('/:id', function(req, res) {
    term.update(
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