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
                allowNull: false,
            },
            used: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0
            },
            is_advertise: {
                type: DataTypes.BOOLEAN,
                defaultValue: FALSE
            },
            advertise_line: {
                type: DataTypes.STRING,
                defaultValue: FALSE
            },
            
        },
        {
            indexes: [
                {
                    fields: ['word']
                },
                {
                    fields: ['is_advertise']
                }
            ]
        }
      
    )
}