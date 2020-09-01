import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../enums/service-name.enum";
import { CoreEventService } from "../../features/core/services/core-event.service";
import { AbstractStoreService } from "./abstract-store.service";

interface IDummy {
  name: string;
}

class DummyService extends AbstractStoreService<IDummy> {
  public constructor(serviceName: Readonly<ServiceNameEnum>) {
    super(serviceName, createMock<IDummy>());
  }
}

describe(`AbstractStoreService`, (): void => {
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

      new DummyService(serviceName);

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

      new DummyService(serviceName);

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.APP_CONFIG_CORE_SERVICE
      );
    });
  });
});
