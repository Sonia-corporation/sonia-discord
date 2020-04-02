import { IConfigUpdateNumber } from "../../../config/interfaces/config-update-number";
import { ConfigService } from "../../../config/services/config-service";
import { ServerConfigCoreService } from "./server-config-core-service";
import { ServerConfigMutatorService } from "./server-config-mutator-service";

jest.mock(`../../../config/services/config-service`);

describe(`ServerConfigMutatorService`, (): void => {
  let service: ServerConfigMutatorService;
  let configService: ConfigService;
  let serverConfigCoreService: ServerConfigCoreService;

  beforeEach((): void => {
    service = ServerConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    serverConfigCoreService = ServerConfigCoreService.getInstance();
  });

  describe(`updatePort()`, (): void => {
    let port: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      port = 1234;
      serverConfigCoreService.port = 8888;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(1234);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updatePort(port);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `ServerConfigMutatorService`,
        newValue: 1234,
        oldValue: 8888,
        valueName: `port`,
      } as IConfigUpdateNumber);
    });

    it(`should update the server config port with the updated number`, (): void => {
      expect.assertions(1);

      service.updatePort(port);

      expect(serverConfigCoreService.port).toStrictEqual(1234);
    });
  });
});
