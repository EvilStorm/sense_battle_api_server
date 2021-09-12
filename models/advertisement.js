module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'advertisement',
        {   
            thumbnail: {
                type: DataTypes.STRING,
            },
            link: {
                type: DataTypes.STRING,
            },
            priority: {
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
                    fields: ['start_date', 'end_date']
                },
            ]
        }
      
    )
}