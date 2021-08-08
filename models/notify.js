module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'notify',
        {   
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            appStop: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            important: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },            
            used: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
    )
}