module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'term',
        {   
            term: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            user_term: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            used: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
    )
}