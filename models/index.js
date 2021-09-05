'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db['user'].hasOne(db['setting']);
db['user'].hasMany(db['user_availability']);

db['user'].hasMany(db['writing_applicate']);
db['writing_applicate'].belongsTo(db['user']);

db['user'].hasMany(db['writing_reply']);
db['writing_reply'].belongsTo(db['user']);

db['user'].hasMany(db['police']);
db['police'].belongsTo(db['user']);

db['user'].hasMany(db['vote']);
db['vote'].belongsTo(db['user']);

db['writing_subject'].hasMany(db['writing_applicate']);
db['writing_subject'].hasMany(db['writing_collector']);

db['writing_collector'].belongsToMany(db['noun'], {through: 'write_subject_nouns'});
db['noun'].belongsToMany(db['writing_collector'], {through: 'write_subject_nouns'} );

db['writing_applicate'].hasMany(db['writing_reply']);
db['writing_applicate'].hasMany(db['police']);
db['writing_applicate'].hasMany(db['vote']);


db['writing_reply'].hasMany(db['police']);
db['writing_reply'].hasMany(db['vote']);



module.exports = db;
