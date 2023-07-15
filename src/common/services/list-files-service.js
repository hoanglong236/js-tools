const fs = require('fs');
const { isStringContainsAtLeastOneKeyword, getFileExtension } = require('../utils');

const listFiles = (path, ignorePathKeywords, allowedFileExtensions) => {
  if (isStringContainsAtLeastOneKeyword(path, ignorePathKeywords)) {
    return [];
  }

  const fileStats = fs.statSync(path, { encoding: 'utf8' });
  if (!fileStats.isDirectory()) {
    if (allowedFileExtensions.includes(getFileExtension(path))) {
      return [path];
    }
    return [];
  }

  const children = fs.readdirSync(path);
  return [].concat(
    ...children.map((child) => listFiles(path + '\\' + child, ignorePathKeywords, allowedFileExtensions))
  );
};

module.exports = {
  listFiles,
};
