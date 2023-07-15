const { Pool } = require('pg');

const DB_CONFIG = require('./db-config.json');

const postgreSQLConnection = new Pool({
  host: DB_CONFIG.HOST,
  port: DB_CONFIG.PORT,
  user: DB_CONFIG.USER,
  password: DB_CONFIG.PASSWORD,
  database: DB_CONFIG.DATABASE,
});

(async () => {
  await postgreSQLConnection.connect();
})();

module.exports = {
  postgreSQLConnection,
};
