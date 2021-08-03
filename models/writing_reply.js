module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'writing_reply',
        {   
            say: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            like: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            },
            unlike: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            },
            
        },
    )
}