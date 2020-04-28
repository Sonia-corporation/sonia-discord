import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ServerConfigCoreService } from "./server-config-core.service";

describe(`ServerConfigCoreService`, (): void => {
  let service: ServerConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a ServerConfigCore service`, (): void => {
      expect.assertions(1);

      service = ServerConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(ServerConfigCoreService));
    });

    it(`should return the created ServerConfigCore service`, (): void => {
      expect.assertions(1);

      const result = ServerConfigCoreService.getInstance();

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

    it(`should notify the ServerConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new ServerConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.SERVER_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should have a port`, (): void => {
    expect.assertions(1);

    service = ServerConfigCoreService.getInstance();

    expect(service.port).toStrictEqual(3001);
  });
});
