module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'vote',
        {   
            enable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            vote: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            type: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
        },
    )
}