import { TestExecutionDetailsService, TestExecutionDetails, DataKind } from './modules/details-service/test-execution-details.service';
import { TestRunId } from './modules/details/test-run-id';

export class DummyTestExecutionDetailsService extends TestExecutionDetailsService {
    async getTestExecutionDetails(id: string): Promise<TestExecutionDetails[]> {
        return Promise.resolve([{
          type: DataKind.properties,
          content: {
            'Type': 'Test Step',
            'Execution Time': '4.2 seconds',
            'Status': 'OK'
          }
        }, {
            type: DataKind.text,
            content: 'Dummy log entry'
          }, {
            type: DataKind.image,
            content: 'http://testeditor.org/wp-content/uploads/2014/04/LogoTesteditor-e1403289032145.png'
          }]);
    }
  }
