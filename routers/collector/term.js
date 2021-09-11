const auth = require('../../components/Auth');

var {sequelize, term, } = require('../../models');
var {Op} = require('sequelize');

async function getTerm(currentVersion=0) {

    try {
        var result = await term.findOne({
            where: {
                id: {
                    [Op.gt]: currentVersion
                },
                used: true
            },
            order: [['id', 'desc']],
            limit: 1
        });

        return result;
    } catch (e) {
        return e;        
    }
}

module.exports =  {
    getTerm,
};