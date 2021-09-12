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
            reseaonMsg: {
                type: DataTypes.STRING,
                allowNull: true,
                field: "reseaon_msg",
            },
            type: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
        },
      
    )
}