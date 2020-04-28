import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { IServerConfig } from "../../interfaces/server-config";
import { ServerConfigCoreService } from "./server-config-core.service";
import { ServerConfigService } from "./server-config.service";

describe(`ServerConfigService`, (): void => {
  let service: ServerConfigService;
  let serverConfigCoreService: ServerConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    serverConfigCoreService = ServerConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a ServerConfig service`, (): void => {
      expect.assertions(1);

      service = ServerConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(ServerConfigService));
    });

    it(`should return the created ServerConfig service`, (): void => {
      expect.assertions(1);

      const result = ServerConfigService.getInstance();

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

    it(`should notify the ServerConfig service creation`, (): void => {
      expect.assertions(2);

      service = new ServerConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.SERVER_CONFIG_SERVICE
      );
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = ServerConfigService.getInstance();
      serverConfigCoreService.port = 8888;
    });

    it(`should return the server config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        port: 8888,
      } as IServerConfig);
    });
  });

  describe(`getPort()`, (): void => {
    beforeEach((): void => {
      service = ServerConfigService.getInstance();
      serverConfigCoreService.port = 1234;
    });

    it(`should return the server config port`, (): void => {
      expect.assertions(1);

      const result = service.getPort();

      expect(result).toStrictEqual(1234);
    });
  });
});
