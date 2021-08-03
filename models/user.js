module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {   
            identifyId: {
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
                    fields: ['identifyId']
                },
                {
                    fields: ['nickName']
                },
            ]
        }
      
    )
}