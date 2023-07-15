const {
  nthIndexOf,
  getFileExtension,
  chunkArray,
  execPromisePoolForChunks,
  isStringContainsAtLeastOneKeyword,
} = require('../common-util');

describe('nthIndexOf', () => {
  it('Should return index at the nth occurrence of keyword', () => {
    // Setup
    const str = 'abc hi 12abcd';
    const keyword = 'abc';

    // Asserts
    expect(nthIndexOf(str, keyword, 1)).toBe(0);
    expect(nthIndexOf(str, keyword, 2)).toBe(9);
  });

  it('Should return -1 when nth is outside range', () => {
    // Setup
    const str = 'abc hi 12abcd';
    const keyword = 'abc';

    // Asserts
    expect(nthIndexOf(str, keyword, 0)).toBe(-1);
    expect(nthIndexOf(str, keyword, 3)).toBe(-1);
  });

  it('Should return -1 when keyword not appears', () => {
    // Setup
    const str = 'hi 12abcd';
    const keyword = 'sql';

    // Asserts
    expect(nthIndexOf(str, keyword, 1)).toBe(-1);
  });

  it('Should return -1 when str or keyword is null or empty', () => {
    // Setup
    const str = 'hi 12abcd';
    const keyword = 'abc';

    // Asserts
    expect(nthIndexOf(null, keyword, 1)).toBe(-1);
    expect(nthIndexOf('', keyword, 1)).toBe(-1);

    expect(nthIndexOf(str, null, 1)).toBe(-1);
    expect(nthIndexOf(str, '', 1)).toBe(-1);
  });
});

describe('getFileExtension', () => {
  it('Should return file extension', () => {
    // Asserts
    expect(getFileExtension('D:\\tools\\data.json')).toBe('json');
    expect(getFileExtension('D:\\tools\\common-util.test.js')).toBe('js');
    expect(getFileExtension('D:\\tools\\.env')).toBe('env');
  });

  it('Should return null when path is not path of file', () => {
    // Asserts
    expect(getFileExtension('D:\\tools\\')).toBeNull();
    expect(getFileExtension('D:\\tools\\common')).toBeNull();
    expect(getFileExtension('D:\\tools\\.')).toBeNull();
    expect(getFileExtension('D:\\tools\\..')).toBeNull();
  });

  it('Should return null when path is null or empty', () => {
    // Asserts
    expect(getFileExtension(null)).toBeNull();
    expect(getFileExtension('')).toBeNull();
  });
});

describe('chunkArray', () => {
  it('Should return chunks', () => {
    // Setup
    const arr = [9, 7, 8, 1, 3, 4, 5, 6];

    // Run
    const chunks1 = chunkArray(arr, 1);
    const chunks2 = chunkArray(arr, 4);
    const chunks3 = chunkArray(arr, 3);

    // Asserts
    expect(chunks1.length).toBe(8);
    expect(chunks1[0].length).toBe(1);
    expect(chunks1[1].length).toBe(1);
    expect(chunks1[2].length).toBe(1);
    expect(chunks1[3].length).toBe(1);
    expect(chunks1[4].length).toBe(1);
    expect(chunks1[5].length).toBe(1);
    expect(chunks1[6].length).toBe(1);
    expect(chunks1[7].length).toBe(1);
    expect([].concat(...chunks1)).toEqual(expect.arrayContaining(arr));

    expect(chunks2.length).toBe(2);
    expect(chunks2[0].length).toBe(4);
    expect(chunks2[1].length).toBe(4);
    expect([].concat(...chunks2)).toEqual(expect.arrayContaining(arr));

    expect(chunks3.length).toBe(3);
    expect(chunks3[0].length).toBe(3);
    expect(chunks3[1].length).toBe(3);
    expect(chunks3[2].length).toBe(2);
    expect([].concat(...chunks3)).toEqual(expect.arrayContaining(arr));
  });

  it('Should return chunks when chunk size >= arr.length', () => {
    // Setup
    const arr = [1, 4, 3];

    // Run
    const chunks1 = chunkArray(arr, arr.length);
    const chunks2 = chunkArray(arr, arr.length + 1);

    // Asserts
    expect(chunks1.length).toBe(1);
    expect(chunks1[0].length).toBe(arr.length);
    expect(chunks1[0]).toEqual(expect.arrayContaining(arr));

    expect(chunks2.length).toBe(1);
    expect(chunks2[0].length).toBe(arr.length);
    expect(chunks2[0]).toEqual(expect.arrayContaining(arr));
  });

  it('Should return [] when chunk size < 1', () => {
    // Setup
    const arr = [1, 3, 2];

    // Run
    const chunks1 = chunkArray(arr, 0);
    const chunks2 = chunkArray(arr, -1);

    // Asserts
    expect(chunks1.length).toBe(0);
    expect(chunks2.length).toBe(0);
  });

  it('Should return [] when arr is null or empty', () => {
    // Run
    const chunks1 = chunkArray(null, 1);
    const chunks2 = chunkArray([], 1);

    // Asserts
    expect(chunks1.length).toBe(0);
    expect(chunks2.length).toBe(0);
  });
});

describe('execPromisePoolForChunks', () => {
  it('Should run asyncItemHandler for every item of each chunk', async () => {
    // Setup
    const chunks = [
      [1, 3, 7],
      [2, 4, 8],
    ];
    const result = [];
    const asyncItemHandler = async (item) => {
      result.push(item);
    };

    // Run
    await execPromisePoolForChunks(asyncItemHandler, chunks);

    // Asserts
    expect(result.length).toBe(6);
    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 7, 8]));
  });

  it('Should not run asyncItemHandler when chunks is empty', async () => {
    // Setup
    const result = [];
    const asyncItemHandler = async (item) => {
      result.push(1);
    };

    // Run
    await execPromisePoolForChunks(asyncItemHandler, []);

    // Asserts
    expect(result.length).toBe(0);
  });

  it('Should throw an error when parameter is null', async () => {
    // Setup
    const chunks = [
      [1, 3],
      [2, 4],
    ];
    const result = [];
    const asyncItemHandler = async (item) => {
      result.push(item);
    };

    // Asserts
    await expect(execPromisePoolForChunks(null, chunks)).rejects.toThrow();
    await expect(execPromisePoolForChunks(asyncItemHandler, null)).rejects.toThrow();
  });
});

describe('isStringContainsAtLeastOneKeyword', () => {
  it('Should return true when string contains at least one keyword', () => {
    // Setup
    const keywords = ['abc', 'def'];

    // Asserts
    expect(isStringContainsAtLeastOneKeyword('Hi abc', keywords)).toBeTruthy();
    expect(isStringContainsAtLeastOneKeyword('Hi def', keywords)).toBeTruthy();
    expect(isStringContainsAtLeastOneKeyword('Hi abcdef', keywords)).toBeTruthy();
  });

  it('Should return false when string not contains any keywords', () => {
    // Setup
    const keywords = ['abc', 'def'];

    // Asserts
    expect(isStringContainsAtLeastOneKeyword('Hi ab c', keywords)).toBeFalsy();
    expect(isStringContainsAtLeastOneKeyword('Hi d e f', keywords)).toBeFalsy();
    expect(isStringContainsAtLeastOneKeyword('Hi abd efc', keywords)).toBeFalsy();
  });

  it('Should return false when parameter is null', () => {
    // Asserts
    expect(isStringContainsAtLeastOneKeyword(null, ['abc'])).toBeFalsy();
    expect(isStringContainsAtLeastOneKeyword('Hi abc', null)).toBeFalsy();
  });
  
  it('Should not throw error when keywords has null value', () => {
    // Setup
    const keywords = [null, 'abc', null];

    // Asserts
    expect(isStringContainsAtLeastOneKeyword('Hi abc', keywords)).toBeTruthy();
    expect(isStringContainsAtLeastOneKeyword('Hi def', keywords)).toBeFalsy();
  });
});
