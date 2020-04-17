import { ConfigService } from "../features/config/services/config.service";
import { ILoggerServiceCreated } from "../features/logger/interfaces/logger-service-created";
import { LoggerService } from "../features/logger/services/logger.service";
import { PartialNested } from "../types/partial-nested";
import { AbstractConfigService } from "./abstract-config.service";
import { ServiceNameEnum } from "./enums/service-name.enum";

interface IDummy {
  key1: string;
}

class DummyService extends AbstractConfigService<IDummy> {
  public constructor(
    serviceName: Readonly<ServiceNameEnum>,
    config?: Readonly<PartialNested<IDummy>>
  ) {
    super(serviceName, config);
  }

  public updateConfig(_config?: Readonly<PartialNested<IDummy>>): void {
    // Avoid lint error :)
  }
}

describe(`AbstractConfigService`, (): void => {
  let service: DummyService;
  let loggerService: LoggerService;

  let serviceName: ServiceNameEnum;

  let loggerServiceServiceCreatedSpy: jest.SpyInstance;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();

    // Avoid calling loggerServiceServiceCreatedSpy multiple times
    ConfigService.getInstance();

    loggerServiceServiceCreatedSpy = jest
      .spyOn(loggerService, `serviceCreated`)
      .mockImplementation();
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_SERVICE;
    });

    it(`should log about the creation of the AppConfig service`, (): void => {
      expect.assertions(2);

      service = new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: ServiceNameEnum.APP_CONFIG_SERVICE,
      } as ILoggerServiceCreated);
    });
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_CORE_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
    });

    it(`should log about the creation of the AppConfigCore service`, (): void => {
      expect.assertions(2);

      service = new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: ServiceNameEnum.APP_CONFIG_CORE_SERVICE,
      } as ILoggerServiceCreated);
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    beforeEach((): void => {
      service = new DummyService(serviceName);
    });

    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = service.preUpdateConfig();

      expect(result).toBeUndefined();
    });
  });

  describe(`updateConfig()`, (): void => {
    beforeEach((): void => {
      service = new DummyService(serviceName);
    });

    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = service.updateConfig();

      expect(result).toBeUndefined();
    });
  });

  describe(`postUpdateConfig()`, (): void => {
    beforeEach((): void => {
      service = new DummyService(serviceName);
    });

    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = service.postUpdateConfig();

      expect(result).toBeUndefined();
    });
  });
});
