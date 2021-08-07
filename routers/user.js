const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');
const auth = require('../components/Auth');

var {sequelize, user, setting, writing_applicate,} = require('../models');

router.post('', async function(req, res) {
    console.log(`user Post body: ${JSON.stringify(req.body)}`);


    var user = await doSignIn(req.body.identifyId)
    console.log("joinUs user");
    console.log(user);

    if(user == null) {
        var signInResult = await joinUs(req.body);
        if(signInResult != true) {
            res.json(response.fail(message= "회원가입에 실패했습니다.\n잠시후 다시 시도해주세요.", code= ResponseCode.FAIL.QUERY_FAIL));
            return;
        }

        user = await doSignIn(req.body.identifyId)
    } 

    if(user != null) {
        res.json(response.success(user)); 
    } else {
        res.json(response.fail(message= "로그인에 실패했습니다.", code= ResponseCode.FAIL.QUERY_FAIL));
    }
    
});

async function doSignIn(identifyId) {
    return await getUser(identifyId)
}

async function joinUs(data) {
    let transaction = await sequelize.transaction();
    console.log("joinUs data");
    console.log(data);


    try {

        const userResult = await user.create(data, {transaction});
        console.log(`User: ${userResult}`);

        if(userResult != null) {
            await setting.create({
                userId: userResult.id
            }, {transaction})
            console.log(`Setting Create`);

            transaction.commit();
        }

        return true;
    } catch (e) {
        console.log(e)
        transaction.rollback();
        return false;
    }
}



async function getUser(identifyId) {
    return await user.findOne({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {
                model: setting,
                attributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
            }
        ],
        where: {identifyId}
    });
}



router.get('/:id', async function(req, res) {

    user.findOne({
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

    user.findOne({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {
                model: setting,
                attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
            },
            {
                model: writing_applicate,
                attributes: {exclude: ['createdAt', 'updatedAt']},
                through: {
                    attributes: []
                } 
            }
        ],
        where: {
            id: req.params.id
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
            res.json(response.success({result: 1, message:"사용자 정보가 변경되었습니다."}));
        } else {
            var error = createException(ExceptionType.QUERY_FAIL);
            res.json(response.fail(error, error.errmsg, error.code));
        }
        
    })
    .catch(_ => {
        res.json(response.fail(_));
    })
});

router.delete("/:id", function(req, res) {
    
});

module.exports = router;