module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user_availability',
        {   
            
            reason: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            reason_msg: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            startDate: {
                type: DataTypes.DATE,
            },
            endDate: {
                type: DataTypes.DATE,
            },
        },
    )
}