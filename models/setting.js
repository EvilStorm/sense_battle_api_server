const crypto = require('crypto')


module.exports =  (sequelize, DataTypes) => {
  return sequelize.define(
    'setting',
    {
        alarm_my_contents: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        alarm_system: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        alarm_advertise: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        alarm_event: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        alarm_game_start: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
)}


 