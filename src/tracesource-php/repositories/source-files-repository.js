const { execDMLStatement, execSelectStatement } = require('./base');

const truncateSourceFilesTable = async () => {
  const sql = 'TRUNCATE TABLE source_files';
  const params = [];

  await execDMLStatement(sql, params);
};

const insertSourceFilesTable = async ({ id, path, class_name, parent_class_name }) => {
  const sql = 'INSERT INTO source_files VALUES($1, $2, $3, $4)';
  const params = [id, path, class_name, parent_class_name];

  await execDMLStatement(sql, params);
};

const getSourceFileById = async (id) => {
  const sql = 'SELECT * FROM source_files WHERE id = $1';
  const params = [id];

  const queryResult = await execSelectStatement(sql, params);
  return queryResult[0];
};

const getSourceFileByPath = async (path) => {
  const sql = 'SELECT * FROM source_files WHERE path = $1';
  const params = [path];

  const queryResult = await execSelectStatement(sql, params);
  return queryResult[0];
};

const listSourceFiles = async () => {
  const sql = 'SELECT * FROM source_files';
  const params = [];

  return await execSelectStatement(sql, params);
};

const getSourceFilesByParentClassName = async (parentClassName) => {
  const sql = 'SELECT * FROM source_files WHERE parent_class_name = $1';
  const params = [parentClassName];

  return await execSelectStatement(sql, params);
};

const getRecursiveSourceFilesByParentClassName = async (parentClassName) => {
  const sql =
    'WITH RECURSIVE tree_source_files(id, path, class_name, parent_class_name) AS (\n' +
    '  SELECT * FROM source_files\n' +
    '  WHERE class_name = $1\n' +
    '  UNION ALL\n' +
    '  SELECT * FROM source_files sf\n' +
    '  INNER JOIN tree_source_files tsf on tsf.class_name = sf.parent_class_name\n' +
    ')\n' +
    'SELECT * FROM tree_source_files tsf';
  const params = [parentClassName];

  return await execSelectStatement(sql, params);
};

module.exports = {
  truncateSourceFilesTable,
  insertSourceFilesTable,
  getSourceFileById,
  getSourceFileByPath,
  listSourceFiles,
  getSourceFilesByParentClassName,
  getRecursiveSourceFilesByParentClassName,
};
