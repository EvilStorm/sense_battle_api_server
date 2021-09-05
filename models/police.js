module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'police',
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
            type: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
        },
      
    )
}