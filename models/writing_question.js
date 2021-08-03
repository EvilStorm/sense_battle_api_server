module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'writing_question',
        {   
            round: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            },
            startDate: {
                type: DataTypes.DATE,
            },
            endDate: {
                type: DataTypes.DATE,
            },
        },
        {
            indexes: [
                {
                    fields: ['round']
                },
            ]
        }
      
    )
}