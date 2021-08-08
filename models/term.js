module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'term',
        {   
            trem: {
                type: DataTypes.STRING,
            },
            userTerm: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            release: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
    )
}