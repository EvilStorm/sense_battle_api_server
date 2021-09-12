module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'noun',
        {   
            word: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            wordDesc: {
                type: DataTypes.STRING,
                allowNull: true,
                field: "word_desc",
            },
            sourceUrl: {
                type: DataTypes.STRING,
                allowNull: true,
                field: "source_url",
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