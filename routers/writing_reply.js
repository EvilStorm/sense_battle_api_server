const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');
const auth = require('../components/Auth');

var {sequelize, user, writing_subject, writing_applicate, writing_reply, writing_reply_vote} = require('../models');

router.post('', async function(req, res) {

    console.log("post body: ")
    console.log(req.body)

    const reply = await writing_reply.create(req.body);

    if(reply != null) {
        res.json(response.success(reply)); 
    } else {
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));
    }
});

router.post('/:applicateId', auth.isSignIn, async function(req, res) {
    // let transaction = await sequelize.transaction();

    console.log(req.decoded.id)
    try {
        
        const reply = await writing_reply.create(req.body);

        const applicate = await writing_applicate.findOne({
            where: {
                id: req.params.applicateId,
            }
        });
        const postUser = await user.findOne({
            where: {
                id: req.decoded.id
            }
        });

        await applicate.addWriting_reply(reply, {through: 'writing_applicate_reply_map'})
        await postUser.addWriting_reply(reply, {through: 'user_reply_map'})
        await reply.addUser(postUser, {through: 'user_reply_map'})

        res.json(response.success(reply)); 

    } catch (e) {
        console.log(e);
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));
    }

});

router.get('/:id', async function(req, res) {
    writing_reply.findOne({
        where: {id: req.params.id}
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.get('/allInfo/:id', async function(req, res) {
    writing_reply.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {
                model: user,
                attributes: ['id', 'nickName'],
                through: {
                    attributes: []
                } 
            },
            {
                model: writing_applicate,
                attributes: ['id', 'round', 'say'],
                through: {
                    attributes: []
                } 
            },

        ],
        where: {
            id: req.params.id,

        }
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.patch('/:id', function(req, res) {
    writing_applicate.update(
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