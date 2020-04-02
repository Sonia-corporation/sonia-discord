import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { ILoggerLog } from "../interfaces/logger-log";
import { LoggerConfigCoreService } from "./config/logger-config-core-service";
import { LoggerService } from "./logger-service";

jest.mock(`./chalk-service`);
jest.mock(`../../time/services/time-service`);

describe(`LoggerService`, (): void => {
  let service: LoggerService;
  let loggerConfigCoreService: LoggerConfigCoreService;

  beforeEach((): void => {
    service = LoggerService.getInstance();
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
  });

  describe(`error()`, (): void => {
    let loggerLog: ILoggerLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    describe(`when the given log contains a simple message`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
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
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
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
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
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
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
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
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
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
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a disabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: false,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a enabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: true,
          message: `[custom-context] dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.error(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.error(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
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

  describe(`warning()`, (): void => {
    let loggerLog: ILoggerLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    describe(`when the given log contains a simple message`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a disabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: false,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a enabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: true,
          message: `[custom-context] dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.warning(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe(`success()`, (): void => {
    let loggerLog: ILoggerLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    describe(`when the given log contains a simple message`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a disabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: false,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a enabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: true,
          message: `[custom-context] dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.success(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe(`log()`, (): void => {
    let loggerLog: ILoggerLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    describe(`when the given log contains a simple message`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a disabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: false,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a enabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: true,
          message: `[custom-context] dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.log(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.log(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe(`debug()`, (): void => {
    let loggerLog: ILoggerLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    describe(`when the given log contains a simple message`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.debug(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(`● dummy-message`);
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.debug(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a disabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: false,
          message: `dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix and context`, (): void => {
            expect.assertions(2);

            service.debug(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`when the given log contains a message with a enabled extended context`, (): void => {
      beforeEach((): void => {
        loggerLog = {
          context: `dummy-context`,
          extendedContext: true,
          message: `[custom-context] dummy-message`,
        };
      });

      describe(`when the logger level is error`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is warning`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.WARNING;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is success`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is log`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.LOG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the logger level is debug`, (): void => {
        beforeEach((): void => {
          loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
        });

        describe(`when the logger is enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = true;
          });

          it(`should log the message with a prefix, a context and a custom context`, (): void => {
            expect.assertions(2);

            service.debug(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `● [dummy-context][now-format][custom-context] dummy-message`
            );
          });
        });

        describe(`when the logger is not enabled`, (): void => {
          beforeEach((): void => {
            loggerConfigCoreService.isEnabled = false;
          });

          it(`should not log`, (): void => {
            expect.assertions(1);

            service.debug(loggerLog);

            expect(consoleLogSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
