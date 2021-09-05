module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'writing_collector',
        {   
            round: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            },
        },      
    );
}