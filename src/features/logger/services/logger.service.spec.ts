import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { ILoggerLog } from "../interfaces/logger-log";
import { ILoggerServiceCreated } from "../interfaces/logger-service-created";
import { LoggerConfigCoreService } from "./config/logger-config-core.service";
import { LoggerService } from "./logger.service";

jest.mock(`./chalk.service`);
jest.mock(`../../time/services/time.service`);
jest.mock(`../../core/services/core-event.service`);

describe(`LoggerService`, (): void => {
  let service: LoggerService;
  let loggerConfigCoreService: LoggerConfigCoreService;

  beforeEach((): void => {
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Logger service`, (): void => {
      expect.assertions(1);

      service = LoggerService.getInstance();

      expect(service).toStrictEqual(expect.any(LoggerService));
    });

    it(`should return the created Logger service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`error()`, (): void => {
    let loggerLog: ILoggerLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerService.getInstance();

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
            expect(consoleLogSpy).toHaveBeenCalledWith(`error-● dummy-message`);
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
            expect(consoleLogSpy).toHaveBeenCalledWith(`error-● dummy-message`);
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
            expect(consoleLogSpy).toHaveBeenCalledWith(`error-● dummy-message`);
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
            expect(consoleLogSpy).toHaveBeenCalledWith(`error-● dummy-message`);
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
            expect(consoleLogSpy).toHaveBeenCalledWith(`error-● dummy-message`);
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format] dummy-message`
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
              `error-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `error-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `error-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `error-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `error-● context-[dummy-context][now-format][custom-context] dummy-message`
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
      service = LoggerService.getInstance();

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
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `warning-● dummy-message`
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

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `warning-● dummy-message`
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

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `warning-● dummy-message`
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

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.warning(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `warning-● dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format] dummy-message`
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
              `warning-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `warning-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `warning-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `warning-● context-[dummy-context][now-format][custom-context] dummy-message`
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
      service = LoggerService.getInstance();

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
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `success-● dummy-message`
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

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `success-● dummy-message`
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

          it(`should log the message with a prefix`, (): void => {
            expect.assertions(2);

            service.success(loggerLog);

            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
              `success-● dummy-message`
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
              `success-● context-[dummy-context][now-format] dummy-message`
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
              `success-● context-[dummy-context][now-format] dummy-message`
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
              `success-● context-[dummy-context][now-format] dummy-message`
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
              `success-● context-[dummy-context][now-format] dummy-message`
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
              `success-● context-[dummy-context][now-format] dummy-message`
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
              `success-● context-[dummy-context][now-format] dummy-message`
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
              `success-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `success-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `success-● context-[dummy-context][now-format][custom-context] dummy-message`
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
      service = LoggerService.getInstance();

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
            expect(consoleLogSpy).toHaveBeenCalledWith(`log-● dummy-message`);
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
            expect(consoleLogSpy).toHaveBeenCalledWith(`log-● dummy-message`);
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
              `log-● context-[dummy-context][now-format] dummy-message`
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
              `log-● context-[dummy-context][now-format] dummy-message`
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
              `log-● context-[dummy-context][now-format] dummy-message`
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
              `log-● context-[dummy-context][now-format] dummy-message`
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
              `log-● context-[dummy-context][now-format][custom-context] dummy-message`
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
              `log-● context-[dummy-context][now-format][custom-context] dummy-message`
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
      service = LoggerService.getInstance();

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
            expect(consoleLogSpy).toHaveBeenCalledWith(`debug-● dummy-message`);
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
              `debug-● context-[dummy-context][now-format] dummy-message`
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
              `debug-● context-[dummy-context][now-format] dummy-message`
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
              `debug-● context-[dummy-context][now-format][custom-context] dummy-message`
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

  describe(`serviceCreated()`, (): void => {
    let loggerServiceCreated: ILoggerServiceCreated;

    let debugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerService.getInstance();

      debugSpy = jest.spyOn(service, `debug`).mockImplementation();
    });

    describe(`when the given logger service created contains a service ServiceNameEnum.APP_CONFIG_QUERY_SERVICE`, (): void => {
      beforeEach((): void => {
        loggerServiceCreated = {
          service: ServiceNameEnum.APP_CONFIG_QUERY_SERVICE,
        };
      });

      it(`should log a debug log`, (): void => {
        expect.assertions(2);

        service.serviceCreated(loggerServiceCreated);

        expect(debugSpy).toHaveBeenCalledTimes(1);
        expect(debugSpy).toHaveBeenCalledWith({
          context: ServiceNameEnum.APP_CONFIG_QUERY_SERVICE,
          message: `text-created`,
        } as ILoggerLog);
      });
    });

    describe(`when the given logger service created contains a service ServiceNameEnum.CONFIG_SERVICE`, (): void => {
      beforeEach((): void => {
        loggerServiceCreated = {
          service: ServiceNameEnum.CONFIG_SERVICE,
        };
      });

      it(`should log a debug log`, (): void => {
        expect.assertions(2);

        service.serviceCreated(loggerServiceCreated);

        expect(debugSpy).toHaveBeenCalledTimes(1);
        expect(debugSpy).toHaveBeenCalledWith({
          context: ServiceNameEnum.CONFIG_SERVICE,
          message: `text-created`,
        } as ILoggerLog);
      });
    });
  });
});
