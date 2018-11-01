import { DataKind, LogLevel, TestExecutionDetails,
  TestExecutionDetailsService } from './modules/details-service/test-execution-details.service';

export class DummyTestExecutionDetailsService extends TestExecutionDetailsService {
  static readonly logForLevel: Map<LogLevel, string> = new Map([
    [LogLevel.CRITICAL, 'CRITICAL message'],
    [LogLevel.ERROR, 'CRITICAL message\nERROR message'],
    [LogLevel.WARNING, 'CRITICAL message\nERROR message\nWARNING message'],
    [LogLevel.INFO, 'CRITICAL message\nERROR message\nWARNING message\nINFO message'],
    [LogLevel.DEBUG, 'CRITICAL message\nERROR message\nWARNING message\nINFO message\nDEBUG message'],
    [LogLevel.TRACE, 'CRITICAL message\nERROR message\nWARNING message\nINFO message\nDEBUG message\nTRACE message']]);

  getTestExecutionLog(id: string, logLevel = LogLevel.TRACE): Promise<TestExecutionDetails[]> {
    return Promise.resolve([{
        type: DataKind.text,
        content: DummyTestExecutionDetailsService.logForLevel.get(logLevel)
      }]);

  }
    async getTestExecutionDetails(id: string, logLevel = LogLevel.TRACE): Promise<TestExecutionDetails[]> {
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
            content: DummyTestExecutionDetailsService.logForLevel.get(logLevel)
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
