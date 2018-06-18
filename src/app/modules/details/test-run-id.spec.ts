import { TestRunId } from './test-run-id';

describe('TestRunId', () => {

  it('can be created', () => {
    // given
    const testSuiteID = 'testSuite0';
    const testSuiteRunID = 'testSuiteRun0';
    const testRunID = 'testRun0';
    const treeID = 'treeElement0';

    // when
    const id = new TestRunId(testSuiteID, testSuiteRunID, testRunID, treeID);

    // then
    expect(id.testSuiteID).toEqual(testSuiteID);
    expect(id.testSuiteRunID).toEqual(testSuiteRunID);
    expect(id.testRunID).toEqual(testRunID);
    expect(id.treeID).toEqual(treeID);
  });


  [
    [ null, 'testSuiteRun0', 'testRun0', 'treeElement0' ],
    [ 'testSuite0', null, 'testRun0', 'treeElement0' ],
    [ null, null, 'testRun0', 'treeElement0' ],
    [ 'testSuite0', 'testSuiteRun0', null, 'treeElement0' ],
    [ null, 'testSuiteRun0', null, 'treeElement0' ],
    [ 'testSuite0', null, null, 'treeElement0' ],
    [ null, null, null, 'treeElement0' ],
    [ '', 'testSuiteRun0', 'testRun0', 'treeElement0' ],
    [ 'testSuite0', '', 'testRun0', 'treeElement0' ],
    [ '', '', 'testRun0', 'treeElement0' ],
    [ 'testSuite0', 'testSuiteRun0', '', 'treeElement0' ],
    [ '', 'testSuiteRun0', '', 'treeElement0' ],
    [ 'testSuite0', '', '', 'treeElement0' ],
    [ '', '', '', 'treeElement0' ],
  ].forEach((parameters) => {
    it('cannot be created with any of test suite id, test suite run id, or test run id missing', () => {
      // given arguments
      // when
      try {
        const id = new TestRunId(parameters[0], parameters[1], parameters[2], parameters[3]);
        fail('expected exception but none was thrown.');
      // then
      } catch (exception) {
        expect(exception).toEqual(new Error('Neither of Test Suite ID, Test Suite Run ID, and Test Run ID must be null or empty.'));
      }
    });
  });

  describe('toPathString', () => {

    it('returns a path string', () => {
      // given
      const id = new TestRunId('testSuite0', 'testSuiteRun0', 'testRun0', 'treeElement0');

      // when
      const actualPathString = id.toPathString();

      // then
      expect(actualPathString).toEqual('testSuite0/testSuiteRun0/testRun0/treeElement0');
    });

    it('escapes characters not valid in URIs', () => {
      // given
      const id = new TestRunId('weird/id', '@"§$%&/=öäüß?,;:#+{}[]', `0123456789-_.!~*'()`, `A super-long text for an ID,
      that even contains a line break`);

      // when
      const actualPathString = id.toPathString();

      // then
      expect(actualPathString).toEqual('weird%2Fid/' +
        '%40%22%C2%A7%24%25%26%2F%3D%C3%B6%C3%A4%C3%BC%C3%9F%3F%2C%3B%3A%23%2B%7B%7D%5B%5D/' +
        `0123456789-_.!~*'()/` +
        'A%20super-long%20text%20for%20an%20ID%2C%0A%20%20%20%20%20%20that%20even%20contains%20a%20line%20break');
    });

  });

});
