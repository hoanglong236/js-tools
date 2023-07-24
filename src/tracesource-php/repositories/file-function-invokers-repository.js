const { execDMLStatement } = require('./base');

const truncateFileFunctionInvokersTable = async () => {
  const sql = 'TRUNCATE TABLE file_function_invokers';
  const params = [];

  await execDMLStatement(sql, params);
};

const insertFileFunctionInvokersTable = async ({ id, fileId, functionId, lineNumber, lineContent }) => {
  const sql = 'INSERT INTO file_function_invokers VALUES ($1, $2, $3, $4, $5)';
  const params = [id, fileId, functionId, lineNumber, lineContent];

  await execDMLStatement(sql, params);
};

module.exports = {
  truncateFileFunctionInvokersTable,
  insertFileFunctionInvokersTable,
};
