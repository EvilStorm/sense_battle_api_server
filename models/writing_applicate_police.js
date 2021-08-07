module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'writing_applicate_police',
        {   
            enable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            reseaon: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            reseaon_msg: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
            }
        },
        {
            indexes: [
                {
                    fields: ['userId']
                },
            ]
        }
      
    )
}