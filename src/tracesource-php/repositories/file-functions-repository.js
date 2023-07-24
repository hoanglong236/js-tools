const { execDMLStatement, execSelectStatement } = require('./base');

const truncateFileFunctionsTable = async () => {
  const sql = 'TRUNCATE TABLE file_functions';
  const params = [];

  await execDMLStatement(sql, params);
};

const insertFileFunctionsTable = async ({ id, fileId, functionSignature, functionName }) => {
  const sql = 'INSERT INTO file_functions VALUES ($1, $2, $3, $4)';
  const params = [id, fileId, functionSignature, functionName];

  await execDMLStatement(sql, params);
};

const getFileFunctionsByFileId = async (fileId) => {
  const sql = 'SELECT * FROM file_functions WHERE file_id = $1';
  const params = [fileId];

  const queryResult = await execSelectStatement(sql, params);
  return queryResult.rows;
};

module.exports = {
  truncateFileFunctionsTable,
  insertFileFunctionsTable,
  getFileFunctionsByFileId,
};
