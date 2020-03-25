import { LOGGER_CONFIG } from '../constants/logger-config';
import { LoggerConfigLevelEnum } from '../enums/logger-config-level.enum';
import { ILoggerLog } from '../interfaces/logger-log';
import { LoggerService } from './logger-service';

jest.mock(`./chalk-service`);

describe(`loggerService`, (): void => {
  let service: LoggerService;

  beforeEach((): void => {
    service = LoggerService.getInstance();
  });

  describe(`error()`, (): void => {
    let loggerLog: ILoggerLog;

    const consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();

    describe(`when the given log contains a simple message`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          message: `dummy-message`
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          LOGGER_CONFIG.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            LOGGER_CONFIG.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            LOGGER_CONFIG.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
