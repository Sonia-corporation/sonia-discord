import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateNumber } from "../../../config/interfaces/config-update-number";
import { ConfigService } from "../../../config/services/config-service";
import * as GetEnvironmentPortModule from "../../../node/functions/get-environment-port";
import { IServerConfig } from "../../interfaces/server-config";
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

  describe(`init()`, (): void => {
    let getEnvironmentPortSpy: jest.SpyInstance;

    beforeEach((): void => {
      getEnvironmentPortSpy = jest.spyOn(
        GetEnvironmentPortModule,
        `getEnvironmentPort`
      );
    });

    describe(`when the app has a specific port on the command line`, (): void => {
      beforeEach((): void => {
        serverConfigCoreService.port = 8;

        getEnvironmentPortSpy.mockReturnValue(88);
      });

      it(`should update the config port`, (): void => {
        expect.assertions(1);

        service.init();

        expect(serverConfigCoreService.port).toStrictEqual(88);
      });
    });

    describe(`when the app has not a specific port on the command line`, (): void => {
      beforeEach((): void => {
        serverConfigCoreService.port = 8;

        getEnvironmentPortSpy.mockReturnValue(null);
      });

      it(`should not update the config production state`, (): void => {
        expect.assertions(1);

        service.init();

        expect(serverConfigCoreService.port).toStrictEqual(8);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.init();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IServerConfig> | undefined;

    beforeEach((): void => {
      serverConfigCoreService.port = 8;
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(serverConfigCoreService.port).toStrictEqual(8);
      });
    });

    describe(`when the given config contains a port`, (): void => {
      beforeEach((): void => {
        config = {
          port: 88,
        };
      });

      it(`should update the config port`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(serverConfigCoreService.port).toStrictEqual(88);
      });
    });
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
