import { ServiceNameEnum } from "../enums/service-name.enum";
import { CoreEventService } from "../features/core/services/core-event.service";
import { PartialNested } from "../types/partial-nested";
import { AbstractConfigService } from "./abstract-config.service";

jest.mock(`../features/logger/services/logger.service`);
jest.mock(`../features/logger/services/chalk/chalk.service`);
jest.mock(`../features/config/services/config.service`);

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
  let coreEventService: CoreEventService;

  let serviceName: ServiceNameEnum;

  let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();

    coreEventServiceNotifyServiceCreatedSpy = jest
      .spyOn(coreEventService, `notifyServiceCreated`)
      .mockImplementation();
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_SERVICE;
    });

    it(`should notify about the creation of the AppConfig service`, (): void => {
      expect.assertions(2);

      service = new DummyService(serviceName);

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.APP_CONFIG_SERVICE
      );
    });
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_CORE_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
    });

    it(`should notify about the creation of the AppConfigCore service`, (): void => {
      expect.assertions(2);

      service = new DummyService(serviceName);

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.APP_CONFIG_CORE_SERVICE
      );
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
