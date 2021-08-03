const crypto = require('crypto')


module.exports =  (sequelize, DataTypes) => {
  return sequelize.define(
    'setting',
    {
        pushAlarm: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        scheduleAlarm: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
)}


 