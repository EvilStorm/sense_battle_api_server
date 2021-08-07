module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        'user_cutoff',
        {   
            enable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            target_user_id:{
                type: DataTypes.INTEGER,
            }
        },
        {
            indexes: [
                {
                    fields: ['user_id']
                },
            ]
        }
      
    )
}