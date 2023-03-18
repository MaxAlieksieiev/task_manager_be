const path = require('path')

require('dotenv').config({
  path: path.join(__dirname + '/../../.env'),
});

module.exports = {
  development: {
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "postgres",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: true,
    define: {
      timestamps: true
    }
  },
};
