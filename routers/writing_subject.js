const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');
const auth = require('../components/Auth');

var {sequelize, noun, writing_subject, writing_applicate, user, writing_reoply} = require('../models');

router.post('/makeSubject', auth.isAdmin, async function(req, res) {

    console.log("post body: ")
    console.log(req.body)

    try {
        var nouns = await noun.findAll({ order: sequelize.literal('rand()'), limit: 3 });
        console.log(nouns);


        const newSubject = await writing_subject.create(req.body);
        await newSubject.addNoun(nouns[0], {through: 'subject_reply_map'})
        await newSubject.addNoun(nouns[1], {through: 'subject_reply_map'})
        await newSubject.addNoun(nouns[2], {through: 'subject_reply_map'})


        const result = await writing_subject.findOne({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {
                id: newSubject.id,
            },
            include: [
                {
                    model: noun,
                    attributes: ['id', 'word', 'word_desc', 'source_url', 'used'],
                    through: {
                        attributes: []
                    } 
                }
            ],

        })

        res.json(response.success(result)); 

    } catch (e) {
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));

    }
});

router.get('/lastSubject', async function(req, res) {
   try {
        var result = await writing_subject.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            order: [['round', 'desc']],
            limit: 1,
            include: [
                {
                    model: noun,
                    attributes: ['id', 'word', 'word_desc', 'source_url', 'used'],
                    through: {
                        attributes: []
                    } 
                },
            ]
        });
        res.json(response.success(result));

    }catch (e){
        var error = createException(ExceptionType.QUERY_FAIL);
        res.json(response.fail(error, error.errmsg, error.code));

    }
});

router.get('/:id', async function(req, res) {
    writing_subject.findOne({
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
    writing_subject.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: noun,
                attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
                through: {
                    attributes: []
                } 
            },
            {
                model: writing_applicate,
                attributes: {exclude: ['createdAt', 'updatedAt']},
                include: [
                    {
                        model: user,
                        attributes: ['id', 'nickName'],
                        through: {
                            attributes: []
                        },                     
                    }
                ],
                through: {
                    attributes: []
                } 
            },
        ],
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});


router.get('/lastSubject/:subjectId/replay/best', async function(req, res) {
    try {
         var result = await writing_reply.findAll({
             where: {
                subjectId: req.params.subjectId
             },
             attributes: {exclude: ['createdAt', 'updatedAt']},
             order: [['like', 'desc']],
             limit: 15
         });
         res.json(response.success(result));
 
     }catch (e){
         var error = createException(ExceptionType.QUERY_FAIL);
         res.json(response.fail(error, error.errmsg, error.code));
 
     }
 });

 router.get('/lastSubject/replay/timeLine/:startTime/:page', async function(req, res) {
    try {
         var result = await writing_subject.findAll({
             attributes: {exclude: ['createdAt', 'updatedAt']},
             order: [['created_at', 'desc']],

        });
         res.json(response.success(result));
 
     }catch (e){
         var error = createException(ExceptionType.QUERY_FAIL);
         res.json(response.fail(error, error.errmsg, error.code));
 
     }
 });

 


router.patch('/:id', function(req, res) {
    writing_subject.update(
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