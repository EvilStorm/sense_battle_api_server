module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'writing_reply_vote',
        {   
            vote: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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