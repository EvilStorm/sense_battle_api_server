const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');

var {sequelize, noun, writing_subject} = require('../models');

router.post('', async function(req, res) {

    console.log("post body: ")
    console.log(req.body)

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


    // if(result != null) {
    //     res.json(response.success(result)); 
    // } else {
    //     var error = createException(ExceptionType.QUERY_FAIL);
    //     res.json(response.fail(error, error.errmsg, error.code));
    // }
    
});

router.get('/:id', async function(req, res) {
    noun.findOne({
        where: {id: req.params.id}
    })
    .then(_ => {
        res.json(response.success(_));
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.patch('/:id', function(req, res) {
    user.update(
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