const dbConfig = require('../../config/db.config');
// @ts-ignore
let db: any;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// @ts-ignore
db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// models
db.user = require('./user')(sequelize, Sequelize);
db.refreshToken = require('./refreshToken')(sequelize, Sequelize);

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id',
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id',
});

module.exports = db;
