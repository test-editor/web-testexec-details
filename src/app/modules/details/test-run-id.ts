// TODO: code clone management
export class TestRunId {
  constructor(
    /**
     * ID of a test suite. A test suite is a sequence of tests to be executed.
     * The same test can be contained multiple times in a test suite,
     * to be executed at different points in the sequence.
     */
    public testSuiteID: string,
    /** ID of a test suite run, i.e. a particular execution of a test suite. */
    public testSuiteRunID: string,
    /** ID of a test run, i.e. a particular execution of a single test. */
    public testRunID?: string,
    /** ID of a call tree node, e.g. a particular test step of the test referenced by the test run ID. */
    public treeID?: string) {}

  createChildID(nodeID: string): TestRunId {
    const childID = new TestRunId(this.testSuiteID, this.testSuiteRunID);
    if (this.testRunID) {
      childID.treeID = nodeID;
    } else {
      childID.testRunID = nodeID;
    }
    return childID;
  }

  toPathString(): string {
    let pathString = this.testSuiteID + '/' + this.testSuiteRunID;
    if (this.testRunID && this.testRunID.length > 0) {
      pathString += '/' + this.testRunID;
      if (this.treeID && this.treeID.length > 0) {
        pathString += '/' + this.treeID;
      }
    }
    return pathString;
  }
}
