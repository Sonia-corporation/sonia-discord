import { IServerConfig } from "../../interfaces/server-config";
import { ServerConfigCoreService } from "./server-config-core.service";
import { ServerConfigService } from "./server-config.service";

jest.mock(`../../../config/services/config.service`);

describe(`ServerConfigService`, (): void => {
  let service: ServerConfigService;
  let serverConfigCoreService: ServerConfigCoreService;

  beforeEach((): void => {
    service = ServerConfigService.getInstance();
    serverConfigCoreService = ServerConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
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
      serverConfigCoreService.port = 1234;
    });

    it(`should return the server config port`, (): void => {
      expect.assertions(1);

      const result = service.getPort();

      expect(result).toStrictEqual(1234);
    });
  });
});
