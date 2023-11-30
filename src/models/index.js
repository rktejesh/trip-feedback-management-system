const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================

// Relationship: Traveler to Feedback (One-to-Many)
db.Traveler.hasMany(db.Feedback, {
  foreignKey: 'travelerID'
});

// Relationship: Traveler to Feedback (One-to-Many)
db.Traveler.hasMany(db.Trip, {
  foreignKey: 'travelerID'
});

// Relationship: Trip to Feedback (One-to-Many)
db.Trip.hasMany(db.Feedback, {
  foreignKey: 'tripID'
});

// Relationship: Driver to Trip (One-to-Many)
db.Driver.hasMany(db.Trip, {
  foreignKey: 'driverID'
});

// Relationship: Feedback to Traveler (Many-to-One)
db.Feedback.belongsTo(db.Traveler, {
  foreignKey: 'travelerID'
});

// Relationship: Feedback to Trip (Many-to-One)
db.Feedback.belongsTo(db.Trip, {
  foreignKey: 'tripID'
});

// Relationship: Feedback to Trip (Many-to-One)
db.Trip.belongsTo(db.Traveler, {
  foreignKey: 'travelerID'
});

// Relationship: FeedbackResponse to Feedback (Many-to-One)
db.FeedbackResponse.belongsTo(db.Feedback, {
  foreignKey: 'feedbackID'
});

// Relationship: FeedbackResponse to Question (Many-to-One)
db.FeedbackResponse.belongsTo(db.Question, {
  foreignKey: 'questionID'
});

module.exports = db;
