const auth = require('../../components/Auth');

var {sequelize, app_version, } = require('../../models');
var {Op} = require('sequelize');

async function getAppVersion(currentVersion=0) {

    console.log(`afterIndex : ${currentVersion}`)
    try {
        var result = await app_version.findAll({
            attributes: [
                [sequelize.fn('max', sequelize.col('version')), 'version'],
                [sequelize.fn('max', sequelize.col('message')), 'message'],
                [sequelize.fn('max', sequelize.col('nessesary')), 'nessesary'],
                [sequelize.fn('max', sequelize.col('used')), 'used'],
            ],
            where: {
                version: {
                    [Op.gt]: currentVersion 
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

module.exports =  {
    getAppVersion,
};