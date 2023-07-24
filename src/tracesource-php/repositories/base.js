const { postGreConnection } = require('../connections');

const execSelectStatement = async (stmt, params) => {
  return await postGreConnection
    .query(stmt, params)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('Query failed: ' + stmt);
      console.log('Params: ', params);
      console.log(err);
    });
};

const execDMLStatement = async (stmt, params) => {
  await postGreConnection
    .query(stmt, params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Query failed: ' + stmt);
      console.log('Params: ', params);
      console.log(err);
    });
};

module.exports = {
  execDMLStatement,
  execSelectStatement,
};
