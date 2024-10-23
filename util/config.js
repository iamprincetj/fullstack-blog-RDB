require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DB_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
};
