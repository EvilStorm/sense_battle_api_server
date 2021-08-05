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
            start_date: {
                type: DataTypes.DATE,
            },
            end_date: {
                type: DataTypes.DATE,
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