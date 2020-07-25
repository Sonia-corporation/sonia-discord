import { Subject } from "rxjs";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { IJobDateLog } from "../interfaces/job-date-log";
import { ILoggerLog } from "../interfaces/logger-log";
import { ILoggerServiceCreated } from "../interfaces/logger-service-created";
import { LoggerConfigCoreService } from "./config/logger-config-core.service";
import { LoggerService } from "./logger.service";

jest.mock(`./chalk/chalk.service`);
jest.mock(`../../time/services/time.service`);
jest.mock(`../../core/services/core-event.service`);

describe(`LoggerService`, (): void => {
  let service: LoggerService;
  let loggerConfigCoreService: LoggerConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
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

  describe(`init()`, (): void => {
    let createdServices: ServiceNameEnum[];
    let serviceCreated$: Subject<ServiceNameEnum>;

    let coreEventServiceGetCreatedServicesSpy: jest.SpyInstance;
    let serviceCreatedSpy: jest.SpyInstance;
    let coreEventServiceServiceCreated$Spy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerService.getInstance();
      createdServices = [];
      serviceCreated$ = new Subject<ServiceNameEnum>();

      coreEventServiceGetCreatedServicesSpy = jest
        .spyOn(coreEventService, `getCreatedServices`)
        .mockReturnValue(createdServices);
      serviceCreatedSpy = jest
        .spyOn(service, `serviceCreated`)
        .mockImplementation();
      coreEventServiceServiceCreated$Spy = jest
        .spyOn(coreEventService, `serviceCreated$`)
        .mockReturnValue(serviceCreated$);
    });

    it(`should get the list of created services`, (): void => {
      expect.assertions(2);

      service.init();

      expect(coreEventServiceGetCreatedServicesSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceGetCreatedServicesSpy).toHaveBeenCalledWith();
    });

    describe(`when there is no created service`, (): void => {
      beforeEach((): void => {
        createdServices = [];

        coreEventServiceGetCreatedServicesSpy.mockReturnValue(createdServices);
      });

      it(`should not log about a created service`, (): void => {
        expect.assertions(1);

        service.init();

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(1);
      });

      it(`should log about the Logger service creation`, (): void => {
        expect.assertions(2);

        service.init();

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(1);
        expect(serviceCreatedSpy).toHaveBeenCalledWith({
          service: ServiceNameEnum.LOGGER_SERVICE,
        } as ILoggerServiceCreated);
      });
    });

    describe(`when there is one created service`, (): void => {
      beforeEach((): void => {
        createdServices = [ServiceNameEnum.SERVER_SERVICE];

        coreEventServiceGetCreatedServicesSpy.mockReturnValue(createdServices);
      });

      it(`should log about a created service one time`, (): void => {
        expect.assertions(2);

        service.init();

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(2);
        expect(serviceCreatedSpy).toHaveBeenNthCalledWith(1, {
          service: ServiceNameEnum.SERVER_SERVICE,
        } as ILoggerServiceCreated);
      });

      it(`should log about the Logger service creation`, (): void => {
        expect.assertions(2);

        service.init();

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(2);
        expect(serviceCreatedSpy).toHaveBeenNthCalledWith(2, {
          service: ServiceNameEnum.LOGGER_SERVICE,
        } as ILoggerServiceCreated);
      });
    });

    describe(`when there are two created services`, (): void => {
      beforeEach((): void => {
        createdServices = [
          ServiceNameEnum.SERVER_SERVICE,
          ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE,
        ];

        coreEventServiceGetCreatedServicesSpy.mockReturnValue(createdServices);
      });

      it(`should log about a created service two times`, (): void => {
        expect.assertions(3);

        service.init();

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(3);
        expect(serviceCreatedSpy).toHaveBeenNthCalledWith(1, {
          service: ServiceNameEnum.SERVER_SERVICE,
        } as ILoggerServiceCreated);
        expect(serviceCreatedSpy).toHaveBeenNthCalledWith(2, {
          service: ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE,
        } as ILoggerServiceCreated);
      });

      it(`should log about the Logger service creation`, (): void => {
        expect.assertions(2);

        service.init();

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(3);
        expect(serviceCreatedSpy).toHaveBeenNthCalledWith(3, {
          service: ServiceNameEnum.LOGGER_SERVICE,
        } as ILoggerServiceCreated);
      });
    });

    it(`should listen for new asynchronous service creation`, (): void => {
      expect.assertions(2);

      service.init();

      expect(coreEventServiceServiceCreated$Spy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceServiceCreated$Spy).toHaveBeenCalledWith();
    });

    describe(`when a new service was created asynchronously`, (): void => {
      it(`should log about the new service creation`, (): void => {
        expect.assertions(2);

        service.init();
        serviceCreated$.next(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_SERVICE);

        expect(serviceCreatedSpy).toHaveBeenCalledTimes(2);
        expect(serviceCreatedSpy).toHaveBeenNthCalledWith(2, {
          service: ServiceNameEnum.DISCORD_MESSAGE_CONFIG_SERVICE,
        } as ILoggerServiceCreated);
      });
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

  describe(`logJobDate()`, (): void => {
    let jobDateLog: IJobDateLog;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerService.getInstance();
      jobDateLog = {
        context: `dummy-context`,
        jobDate: `dummy-job-date`,
        jobDateHumanized: `dummy-job-date-humanized`,
        jobName: `dummy-job-name`,
      };
      loggerConfigCoreService.isEnabled = true;
      loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;

      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should log the job date`, (): void => {
      expect.assertions(2);

      service.logJobDate(jobDateLog);

      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `debug-● context-[dummy-context][now-format] text-dummy-job-name job: value-dummy-job-date-humanized hint-(dummy-job-date)`
      );
    });
  });
});
