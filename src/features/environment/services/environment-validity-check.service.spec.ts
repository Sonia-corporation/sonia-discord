import { EnvironmentValidityCheckService } from './environment-validity-check.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ILoggerLog } from '../../logger/interfaces/logger-log';
import { LoggerService } from '../../logger/services/logger.service';
import _ from 'lodash';

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`EnvironmentValidityCheckService`, (): void => {
  let service: EnvironmentValidityCheckService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a EnvironmentValidityCheckService service`, (): void => {
      expect.assertions(1);

      service = EnvironmentValidityCheckService.getInstance();

      expect(service).toStrictEqual(expect.any(EnvironmentValidityCheckService));
    });

    it(`should return the created EnvironmentValidityCheckService service`, (): void => {
      expect.assertions(1);

      const result = EnvironmentValidityCheckService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the EnvironmentValidityCheckService service creation`, (): void => {
      expect.assertions(2);

      service = new EnvironmentValidityCheckService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.ENVIRONMENT_VALIDITY_CHECK_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new EnvironmentValidityCheckService();
      process.env.GOOGLE_APPLICATION_CREDENTIALS = `dummy-google-application-credentials`;
      process.env.SHOULD_DISPLAY_MORE_DEBUG_LOGS = `true`;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    describe(`when the Google application credential environment variable is not valid`, (): void => {
      beforeEach((): void => {
        _.unset(process.env, `GOOGLE_APPLICATION_CREDENTIALS`);
      });

      it(`should log an error with the Google application credential environment variable`, (): void => {
        expect.assertions(3);

        expect((): void => {
          service.init();
        }).toThrow(new Error(`GOOGLE_APPLICATION_CREDENTIALS env is not a string`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `EnvironmentValidityCheckService`,
          message: `text-This error should not happen. If everything is as expected this is not related to the current developer environment and it means that a breaking change happened.`,
        } as ILoggerLog);
      });
    });

    describe(`when the should display more debug logs environment variable is not valid`, (): void => {
      beforeEach((): void => {
        _.unset(process.env, `SHOULD_DISPLAY_MORE_DEBUG_LOGS`);
      });

      it(`should log an error with the should display more debug logs environment variable`, (): void => {
        expect.assertions(3);

        expect((): void => {
          service.init();
        }).toThrow(new Error(`SHOULD_DISPLAY_MORE_DEBUG_LOGS env is not either true or false (string)`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `EnvironmentValidityCheckService`,
          message: `text-This error should not happen. If everything is as expected this is not related to the current developer environment and it means that a breaking change happened.`,
        } as ILoggerLog);
      });
    });

    describe(`when all the environment variables are valid`, (): void => {
      beforeEach((): void => {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = `dummy-google-application-credentials`;
        process.env.SHOULD_DISPLAY_MORE_DEBUG_LOGS = `true`;
      });

      it(`should not log an error with the Google application credential environment variable`, (): void => {
        expect.assertions(1);

        service.init();

        expect(loggerServiceErrorSpy).not.toHaveBeenCalled();
      });

      it(`should log the Google application credential environment variable`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `EnvironmentValidityCheckService`,
          message: `text-GOOGLE_APPLICATION_CREDENTIALS env: value-dummy-google-application-credentials`,
        } as ILoggerLog);
      });
    });

    it(`should log the should display more debug logs environment variable`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `EnvironmentValidityCheckService`,
        message: `text-SHOULD_DISPLAY_MORE_DEBUG_LOGS env: value-true`,
      } as ILoggerLog);
    });
  });
});
