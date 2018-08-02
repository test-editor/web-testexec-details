import { TestExecutionDetailsService, TestExecutionDetails, DataKind } from './modules/details-service/test-execution-details.service';
import { TestRunId } from './modules/details/test-run-id';

export class DummyTestExecutionDetailsService extends TestExecutionDetailsService {
    async getTestExecutionDetails(id: string): Promise<TestExecutionDetails[]> {
        return Promise.resolve([{
          type: DataKind.properties,
          content: {
            'type': 'Test Step',
            'ID': 'ID42',
            'enter': '54123321123456',  /* timestamps in nanoseconds.     */
            'leave': '109545654567890', /* duration: 15 h 23 min 42.333 s */
            'status': 'OK',
            'preVariables': {
              'foo': '23'
            },
            'postVariables': {
              'bar': '42'
            },
            'emptyFieldsShouldBeFiltered': '',
            'soShouldNullFields': null
          }
        }, {
            type: DataKind.text,
            content: 'Dummy log entry'
          }, {
            type: DataKind.image,
            content: 'http://testeditor.org/wp-content/uploads/2014/04/LogoTesteditor-e1403289032145.png'
          }, {
            type: DataKind.image,
            content: 'http://testeditor.org/wp-content/uploads/2014/04/LogoTesteditor-e1403289032145.png'
          }, {
            type: DataKind.image,
            content: 'http://testeditor.org/wp-content/uploads/2014/04/LogoTesteditor-e1403289032145.png'
          }]);
    }
  }
