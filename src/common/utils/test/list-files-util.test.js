const fs = require('fs');
const { recursiveListFiles } = require('../list-files-util');

describe('recursiveListFiles', () => {
  it('Should return files (including files of subdirectories)', () => {
    // Setup
    const testFolder = __dirname + '\\test-rs-' + Math.floor(Math.random() * 1000);

    fs.mkdirSync(testFolder);
    fs.mkdirSync(testFolder + '\\services');
    fs.mkdirSync(testFolder + '\\services\\test');
    fs.mkdirSync(testFolder + '\\unused');
    fs.mkdirSync(testFolder + '\\unused\\test');

    fs.writeFileSync(testFolder + '\\index.js', 'Nothing');
    fs.writeFileSync(testFolder + '\\data.json', 'Nothing');
    fs.writeFileSync(testFolder + '\\.gitignore', '*');
    fs.writeFileSync(testFolder + '\\services\\index.js', 'Nothing');
    fs.writeFileSync(testFolder + '\\services\\test\\index.test.js', 'Nothing');
    fs.writeFileSync(testFolder + '\\services\\test\\index.ignore', 'Nothing');
    fs.writeFileSync(testFolder + '\\unused\\index.js', 'Nothing');
    fs.writeFileSync(testFolder + '\\unused\\test\\index.test.js', 'Nothing');

    // Run
    const files = recursiveListFiles(testFolder, ['unused'], ['ignore']);

    // Asserts
    expect(files.length).toBe(5);
    expect(files).toEqual(
      expect.arrayContaining([
        testFolder + '\\index.js',
        testFolder + '\\data.json',
        testFolder + '\\.gitignore',
        testFolder + '\\services\\index.js',
        testFolder + '\\services\\test\\index.test.js',
      ])
    );

    // Clear test resources
    fs.rmSync(testFolder, { recursive: true, force: true });
  });

  it('Should return files when path is file path', () => {
    // Setup
    const testFolder = __dirname + '\\test-rs-' + Math.floor(Math.random() * 1000);

    fs.mkdirSync(testFolder);
    fs.writeFileSync(testFolder + '\\index.js', 'Nothing');

    // Run
    const files = recursiveListFiles(testFolder);

    // Asserts
    expect(files.length).toBe(1);
    expect(files[0]).toBe(testFolder + '\\index.js');

    // Clear test resources
    fs.rmSync(testFolder, { recursive: true, force: true });
  });

  it('Should return [] when path is not exists', () => {
    // Setup
    const testFolder = __dirname + '\\test-rs-' + Math.floor(Math.random() * 1000);

    // Run
    const files = recursiveListFiles(testFolder);

    // Asserts
    expect(files.length).toBe(0);
  });

  it('Should return [] when path is null or empty', () => {
    // Asserts
    expect(recursiveListFiles('').length).toBe(0);
    expect(recursiveListFiles(null).length).toBe(0);
  });
});
