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

db['user'].hasOne(db['setting'])
db['user'].hasOne(db['user_availability'])
db['user'].belongsToMany(db['writing_applicate'] ,{through: 'user_writing_applicate_map'})
db['user'].belongsToMany(db['writing_reply'] ,{through: 'user_reply_map'})

db['writing_applicate'].belongsToMany(db['user'] ,{through: 'user_writing_applicate_map'})
db['writing_reply'].belongsToMany(db['user'] ,{through: 'user_reply_map'})


db['user'].belongsToMany(db['writing_reply_vote'] ,{through: 'user_reply_vote_map'})
db['user'].belongsToMany(db['writing_reply_police'] ,{through: 'user_reply_police_map'})
db['user'].belongsToMany(db['writing_applicate_vote'] ,{through: 'user_applicate_vote_map'})
db['user'].belongsToMany(db['writing_applicate_police'] ,{through: 'user_applicate_police_map'})

db['writing_subject'].belongsToMany(db['writing_applicate'] ,{through: 'writing_applicate_map'})
db['writing_applicate'].belongsToMany(db['writing_reply'], {through: 'writing_applicate_reply_map'})
db['writing_reply'].belongsToMany(db['writing_applicate'], {through: 'writing_applicate_reply_map'})

db['writing_subject'].belongsToMany(db['noun'], {through: 'writing_subject_noun_map'})
db['noun'].belongsToMany(db['writing_subject'], {through: 'writing_subject_noun_map'})

db['writing_applicate'].belongsToMany(db['writing_applicate_vote'] ,{through: 'writing_applicate_vote_map'})
db['writing_applicate'].belongsToMany(db['writing_applicate_police'] ,{through: 'writing_applicate_police_map'})
db['writing_applicate_vote'].belongsToMany(db['writing_applicate'] ,{through: 'writing_applicate_vote_map'})
db['writing_applicate_police'].belongsToMany(db['writing_applicate'] ,{through: 'writing_applicate_police_map'})

db['writing_reply'].belongsToMany(db['writing_reply_vote'] ,{through: 'writing_reply_vote_map'})
db['writing_reply'].belongsToMany(db['writing_reply_police'] ,{through: 'writing_reply_police_map'})
db['writing_reply_vote'].belongsToMany(db['writing_reply'] ,{through: 'writing_reply_vote_map'})
db['writing_reply_police'].belongsToMany(db['writing_reply'] ,{through: 'writing_reply_police_map'})


module.exports = db;
