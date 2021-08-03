const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');

var {user} = require('../models');

const auth = require('../components/Auth');


router.post('', async function(req, res) {

    var user = await getUser(req.body.identifyId)
    if(user = null) {
        var signInResult = await joinUs();
        if(signInResult == true) {
            user = await getUser(req.body.identifyId)
        }
    }

    




});

async function doSignIn(identifyId) {

}

async function joinUs(data) {
    let transaction = await sequelize.transaction();

    try {

        const user = await user.create(data, {transaction});
        if(user != null) {
            await setting.create({
                userId: user.id
            }, {transaction})
        }
        return true;
    } catch (e) {
        console.log(e)
        transaction.rollback();
        return false;
    }
}



async function getUser(identifyId) {
    var user = await user.findOne({
        include: [
            {
                model: setting,
                atrributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
            }
        ],
        where: {identifyId}
    });

    return user;
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

router.patch('/', auth.isSignIn, function(req, res) {
    console.log(req.decoded)

    user.update(
        req.body,
        {
            where: {
                id: req.decoded.id
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


module.exports = router;