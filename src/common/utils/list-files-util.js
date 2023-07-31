const fs = require('fs');
const { isStringContainsAtLeastOneKeyword, getFileExtension } = require('.');

const recursiveListFiles = (path, ignorePathKeywords = [], ignoreFileExtensions = []) => {
  try {
    if (isStringContainsAtLeastOneKeyword(path, ignorePathKeywords)) {
      return [];
    }

    const fileStats = fs.statSync(path, { encoding: 'utf8' });
    if (!fileStats.isDirectory()) {
      if (ignoreFileExtensions.includes(getFileExtension(path))) {
        return [];
      }
      return [path];
    }

    const children = fs.readdirSync(path);
    return [].concat(
      ...children.map((child) => recursiveListFiles(path + '\\' + child, ignorePathKeywords, ignoreFileExtensions))
    );
  } catch (e) {
    console.log('Error code: ' + e.code);
    console.log('Error message: ' + e.message);
    return [];
  }
};

module.exports = {
  recursiveListFiles,
};
