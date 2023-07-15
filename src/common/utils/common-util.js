const nthIndexOf = (str, keyword, nth) => {
  if (!str || !keyword) {
    return -1;
  }

  let i = -1;
  while (nth > 0 && i < str.length) {
    i = str.indexOf(keyword, i + 1);
    if (i === -1) {
      break;
    }
    nth--;
  }
  return i;
};

const getFileExtension = (filePath) => {
  if (!filePath) {
    return null;
  }

  const lastDotSymbolIndex = filePath.lastIndexOf('.');
  if (lastDotSymbolIndex === -1 || lastDotSymbolIndex === filePath.length - 1) {
    return null;
  }
  return filePath.substring(lastDotSymbolIndex + 1);
};

const chunkArray = (arr, chunkSize) => {
  if (chunkSize < 1 || !arr) {
    return [];
  }

  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const execPromisePoolForChunks = async (asyncItemHandler, chunks) => {
  if (!asyncItemHandler || !chunks) {
    throw new Error('Invalid parameters');
  }

  const chunksHandler = chunks.map(async (chunk) => {
    for (const item of chunk) {
      await asyncItemHandler(item);
    }
  });
  await Promise.all(chunksHandler);
};

const isStringContainsAtLeastOneKeyword = (str, keywords) => {
  if (!str || !keywords) {
    return false;
  }

  return keywords.some(e => str.includes(e));
};

module.exports = {
  nthIndexOf,
  getFileExtension,
  chunkArray,
  execPromisePoolForChunks,
  isStringContainsAtLeastOneKeyword,
};
