const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');
const auth = require('../components/Auth');

var {sequelize, user, writing_subject, writing_applicate, writing_reply, writing_reply_vote} = require('../models');
const e = require('express');

router.post('', async function(req, res) {

    console.log("post body: ")
    console.log(req.body)

    const result = await writing_applicate.create(req.body);

    if(result != null) {
        res.json(response.success(result)); 
    } else {
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));
    }
});

router.post('/applicate/:subjectId', auth.isSignIn, async function(req, res) {
    // let transaction = await sequelize.transaction();

    console.log(req.decoded.id)
    try {
        
        const appilcate = await writing_applicate.create({
            round: req.body.round,
            say: req.body.say,
            userId: req.decoded.id,
            writingSubjectId: req.params.subjectId,
        });

        res.json(response.success(appilcate)); 

    } catch (e) {
        console.log(e);
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));
    }

});

router.get('/:id', async function(req, res) {
    writing_applicate.findOne({
        where: {id: req.params.id}
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.get('/round/:round', async function(req, res) {
    writing_applicate.findAll({
        attributes: ['id', 'round', 'say', 'like', 'unlike', 'userId'],
        where: {round: req.params.round,},
        include: [
            {
                model: user,
                attributes: ['id', 'nickName', 'imageUrl'],
            }
        ]
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.get('/allInfo/round/:round', async function(req, res) {
    writing_applicate.findAll({
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
                model: writing_reply,
                attributes: ['id', 'say', 'imageUrl'],
                include: [
                    {
                        model: user,
                        attributes: ['id', 'nickName'],
                        through: {
                            attributes: []
                        } 
        
                    }
                ],
                through: {
                    attributes: []
                } 
            },
            
        ],
        where: {
            round: req.params.round,

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