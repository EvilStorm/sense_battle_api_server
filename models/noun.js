module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'noun',
        {   
            word: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            used: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            }

        },
        {
            indexes: [
                {
                    fields: ['word']
                },
            ]
        }
      
    )
}