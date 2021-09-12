module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {   
            identifyId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'identify_id',
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'image_url',
            },
            joinType: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                field: 'join_type',
            },
            secureLevel: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                field: 'secure_level',
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                field: 'nick_name',
            },
            availability: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            indexes: [
                {
                    fields: ['identify_id']
                },
                {
                    fields: ['nick_name']
                },
                {
                    fields: ['email']
                },
            ]
        }
      
    )
}