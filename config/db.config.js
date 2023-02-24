module.exports = {
  HOST: process.env.DATABASE_HOST || 'host',
  USER: process.env.DATABASE_USER || 'user',
  PASSWORD: process.env.DATABASE_PASSWORD || 'password',
  DB: process.env.DATABASE_NAME || 'db',
  dialect: process.env.DIALECT || 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
