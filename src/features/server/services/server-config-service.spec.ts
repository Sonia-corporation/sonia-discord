import { IConfigUpdateNumber } from '../../config/interfaces/config-update-number';
import { ConfigService } from '../../config/services/config-service';
import { SERVER_CONFIG } from '../constants/server-config';
import { IServerConfig } from '../interfaces/server-config';
import { ServerConfigService } from './server-config-service';

jest.mock(`../../config/services/config-service`);

describe(`ServerConfigService`, (): void => {
  let service: ServerConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = ServerConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      SERVER_CONFIG.port = 8888;
    });

    it(`should return the server config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        port: 8888
      } as IServerConfig);
    });
  });

  describe(`getPort()`, (): void => {
    beforeEach((): void => {
      SERVER_CONFIG.port = 1234;
    });

    it(`should return the server config port`, (): void => {
      expect.assertions(1);

      const result = service.getPort();

      expect(result).toStrictEqual(1234);
    });
  });

  describe(`updatePort()`, (): void => {
    let port: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      port = 1234;
      SERVER_CONFIG.port = 8888;

      configServiceGetUpdatedNumberSpy = jest.spyOn(configService, `getUpdatedNumber`).mockReturnValue(1234);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updatePort(port);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `ServerConfigService`,
        newValue: 1234,
        oldValue: 8888,
        valueName: `port`
      } as IConfigUpdateNumber);
    });

    it(`should update the server config port with the updated number`, (): void => {
      expect.assertions(1);

      service.updatePort(port);

      expect(SERVER_CONFIG.port).toStrictEqual(1234);
    });
  });
});
