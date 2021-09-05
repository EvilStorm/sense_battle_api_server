module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {   
            identifyId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
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
            availability: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            indexes: [
                {
                    fields: ['identifyId']
                },
                {
                    fields: ['nickName']
                },
                {
                    fields: ['email']
                },
            ]
        }
      
    )
}