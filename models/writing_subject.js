module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'writing_subject',
        {   
            round: {
                type: DataTypes.INTEGER.UNSIGNED,
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
        {
            indexes: [
                {
                    fields: ['round']
                },
            ]
        }
      
    )
}