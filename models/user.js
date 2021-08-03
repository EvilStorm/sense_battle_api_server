module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {   
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            joinType: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            secureLevel: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
        },
        {
            indexes: [
                {
                    fields: ['userId']
                },
                {
                    fields: ['nickName']
                },
            ]
        }
      
    )
}