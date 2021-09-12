module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'term',
        {   
            term: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userTerm: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: "user_term",

            },
            used: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
    )
}