module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user_availability',
        {   
            
            reason: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            reasonMsg: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            startDate: {
                type: DataTypes.DATE,
                field: "start_date",
            },
            endDate: {
                type: DataTypes.DATE,
                field: "end_date",
            },
        },
    )
}