const {
  truncateSourceFilesTable,
  insertSourceFilesTable,
  getSourceFileById,
  getSourceFileByPath,
} = require('./source-files-repository');
const {
  truncateFileFunctionsTable,
  insertFileFunctionsTable,
  getFileFunctionsByFileId,
} = require('./file-functions-repository');
const {
  truncateFileFunctionInvokersTable,
  insertFileFunctionInvokersTable,
} = require('./file-function-invokers-repository');

module.exports = {
  truncateSourceFilesTable,
  insertSourceFilesTable,
  getSourceFileById,
  getSourceFileByPath,
  truncateFileFunctionsTable,
  insertFileFunctionsTable,
  getFileFunctionsByFileId,
  truncateFileFunctionInvokersTable,
  insertFileFunctionInvokersTable,
};
