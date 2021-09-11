const auth = require('../../components/Auth');

var {sequelize, notify, } = require('../../models');
var {Op} = require('sequelize');

async function getSingleTopNotify(afterIndex=0) {

    console.log(`afterIndex : ${afterIndex}`)
    try {
        var result = await notify.findAll({
            attributes: [
                [sequelize.fn('max', sequelize.col('title')), 'title'],
                [sequelize.fn('max', sequelize.col('message')), 'message'],
                [sequelize.fn('max', sequelize.col('important')), 'important'],
                [sequelize.fn('max', sequelize.col('used')), 'used'],
                [sequelize.fn('max', sequelize.col('appStop')), 'appStop'],
            ],
            where: {
                id: {
                    [Op.gt]: afterIndex 
                },
                used: true
            },
            order: [['id', 'desc']],
            group: ['used'],

        });

        return result;
    } catch (e) {
        return e;        
    }
}


async function getNotifies(afterIndex=0) {
    try {
        var notifies = await notify.findAll({
            where: {
                id: {
                    [Op.gt]: afterIndex 
                },
                used:true,
            },
            order: [['id', 'desc']],
        });

        return notifies;

    } catch (e) {
        return e;
    }
}


async function getAppStartNotifyList(afterIndex=0) {
    try{

        var appStopResult = await notify.findOne({
            where: {
                id: {
                    [Op.gt]: afterIndex 
                },
                used:true,
                appStop: true
            },
            order: [['id', 'desc']],
        })

        var notifyList = await notify.findAll({
            where: {
                id: {
                    [Op.gt]: afterIndex 
                },
                used:true,
                appStop: false
            },
            order: [['id', 'desc']],
        });

        var result = {
            appStopNotify: appStopResult,
            normalNotifies: notifyList
        }

        return result;
    } catch (e) {
        return e;
    }
}

module.exports =  {
    getNotifies,
    getAppStartNotifyList,
};