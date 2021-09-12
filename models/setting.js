const crypto = require('crypto')


module.exports =  (sequelize, DataTypes) => {
  return sequelize.define(
    'setting',
    {
        alarmMyContents: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "alarm_my_contents",
        },
        alarmSystem: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "alarm_system",
        },
        alarmAdvertise: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "alarm_advertise",
        },
        alarmEvent: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "alarm_event",
        },
        alarmGameStart: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "alarm_game_start",
        },
    },
)}


 