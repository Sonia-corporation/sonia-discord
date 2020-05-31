import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateNumber } from "../../../config/interfaces/config-update-number";
import { ConfigService } from "../../../config/services/config.service";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerService } from "../../../logger/services/logger.service";
import * as GetEnvironmentPortModule from "../../../node/functions/get-environment-port";
import { IServerConfig } from "../../interfaces/server-config";
import { ServerConfigCoreService } from "./server-config-core.service";
import { ServerConfigMutatorService } from "./server-config-mutator.service";
import { ServerConfigService } from "./server-config.service";

jest.mock(`../../../time/services/time.service`);
jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`ServerConfigMutatorService`, (): void => {
  let service: ServerConfigMutatorService;
  let configService: ConfigService;
  let serverConfigCoreService: ServerConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    serverConfigCoreService = ServerConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IServerConfig> | undefined;

    beforeEach((): void => {
      config = {
        port: 8888,
      };
    });

    it(`should create a ServerConfigMutator service`, (): void => {
      expect.assertions(1);

      service = ServerConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(ServerConfigMutatorService));
    });

    it(`should return the created ServerConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = ServerConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IServerConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the ServerConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new ServerConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.SERVER_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current port`, (): void => {
        expect.assertions(1);
        serverConfigCoreService.port = 8888;

        service = new ServerConfigMutatorService(config);

        expect(serverConfigCoreService.port).toStrictEqual(8888);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          port: 8888,
        };
      });

      it(`should override the port`, (): void => {
        expect.assertions(1);
        serverConfigCoreService.port = 8;

        service = new ServerConfigMutatorService(config);

        expect(serverConfigCoreService.port).toStrictEqual(8888);
      });
    });
  });

  describe(`init()`, (): void => {
    let getEnvironmentPortSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ServerConfigMutatorService.getInstance();

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

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let serverConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let serverConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ServerConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      serverConfigCoreServiceGetInstanceSpy = jest.spyOn(
        ServerConfigCoreService,
        `getInstance`
      );
      serverConfigServiceGetInstanceSpy = jest.spyOn(
        ServerConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the ServerConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(serverConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(serverConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the ServerConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(serverConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(serverConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IServerConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ServerConfigMutatorService.getInstance();
      serverConfigCoreService.port = 8;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(serverConfigCoreService.port).toStrictEqual(8);
    });

    it(`should not log about the config update`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(loggerLogSpy).not.toHaveBeenCalled();
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

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
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

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[ServerConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updatePort()`, (): void => {
    let port: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ServerConfigMutatorService.getInstance();
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
