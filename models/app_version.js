module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'app_version',
        {   
            version: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nessesary: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            used: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            indexes: [
                {
                    fields: ['version']
                },
            ]
        }
      
    )
}