module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'noun',
        {   
            word: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            word_desc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            source_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            used: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            },
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