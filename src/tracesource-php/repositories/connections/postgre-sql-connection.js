const { Pool } = require('pg');

const DB_CONFIG = require('./db-config.json');
const postgreSQLConnection = new Pool(DB_CONFIG);

(async () => {
  await postgreSQLConnection.connect();
})();

module.exports = {
  postgreSQLConnection,
};
