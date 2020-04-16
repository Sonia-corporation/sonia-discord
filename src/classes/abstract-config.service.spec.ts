import { ILoggerServiceCreated } from "../features/logger/interfaces/logger-service-created";
import { LoggerService } from "../features/logger/services/logger.service";
import { PartialNested } from "../types/partial-nested";
import { AbstractConfigService } from "./abstract-config.service";

interface IDummy {
  key1: string;
}

class DummyService extends AbstractConfigService<IDummy> {
  public constructor(
    serviceName: Readonly<string>,
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

  let serviceName: string;

  let loggerServiceServiceCreatedSpy: jest.SpyInstance;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();

    loggerServiceServiceCreatedSpy = jest
      .spyOn(loggerService, `serviceCreated`)
      .mockImplementation();
  });

  describe(`when the service is created with the name "DummyService"`, (): void => {
    beforeEach((): void => {
      serviceName = `DummyService`;
    });

    it(`should log about the creation of the service`, (): void => {
      expect.assertions(2);

      service = new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: `DummyService`,
      } as ILoggerServiceCreated);
    });
  });

  describe(`when the service is created with the name "Service"`, (): void => {
    beforeEach((): void => {
      serviceName = `Service`;
    });

    it(`should log about the creation of the service`, (): void => {
      expect.assertions(2);

      service = new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: `Service`,
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
