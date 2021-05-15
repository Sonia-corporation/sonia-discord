import { QuoteConfigCoreService } from './quote-config-core.service';
import { QuoteConfigMutatorService } from './quote-config-mutator.service';
import { QuoteConfigService } from './quote-config.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../types/partial-nested';
import { IConfigUpdateString } from '../../../config/interfaces/config-update-string';
import { ConfigService } from '../../../config/services/config.service';
import { CoreEventService } from '../../../core/services/core-event.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { IQuoteConfig } from '../../interfaces/quote-config';

jest.mock(`../../../../time/services/time.service`);
jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`QuoteConfigMutatorService`, (): void => {
  let service: QuoteConfigMutatorService;
  let configService: ConfigService;
  let quoteConfigCoreService: QuoteConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    quoteConfigCoreService = QuoteConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: IPartialNested<IQuoteConfig> | undefined;

    beforeEach((): void => {
      config = {
        apiKey: `dummy-api-key`,
      };
    });

    it(`should create a QuoteConfigMutatorService service`, (): void => {
      expect.assertions(1);

      service = QuoteConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(QuoteConfigMutatorService));
    });

    it(`should return the created QuoteConfigMutatorService service`, (): void => {
      expect.assertions(1);

      const result = QuoteConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: IPartialNested<IQuoteConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the QuoteConfigMutatorService service creation`, (): void => {
      expect.assertions(2);

      service = new QuoteConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.QUOTE_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current API key`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.apiKey = `apiKey`;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.apiKey).toStrictEqual(`apiKey`);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          apiKey: `dummy-api-key`,
        };
      });

      it(`should override the API key`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.apiKey = `apiKey`;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.apiKey).toStrictEqual(`dummy-api-key`);
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let quoteConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let quoteConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = QuoteConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      quoteConfigCoreServiceGetInstanceSpy = jest.spyOn(QuoteConfigCoreService, `getInstance`);
      quoteConfigServiceGetInstanceSpy = jest.spyOn(QuoteConfigService, `getInstance`);
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the QuoteConfigCoreService service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(quoteConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(quoteConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the QuoteConfigService service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(quoteConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(quoteConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: IPartialNested<IQuoteConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = QuoteConfigMutatorService.getInstance();
      quoteConfigCoreService.apiKey = `dummy-api-key`;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(5);

      service.updateConfig();

      expect(quoteConfigCoreService.apiKey).toStrictEqual(`dummy-api-key`);
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
        expect.assertions(5);

        service.updateConfig();

        expect(quoteConfigCoreService.apiKey).toStrictEqual(`dummy-api-key`);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains an API key`, (): void => {
      beforeEach((): void => {
        config = {
          apiKey: `apiKey`,
        };
      });

      it(`should update the config API key`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(quoteConfigCoreService.apiKey).toStrictEqual(`apiKey`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[QuoteConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateApiKey()`, (): void => {
    let apiKey: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = QuoteConfigMutatorService.getInstance();
      apiKey = `dummy-api-key`;
      quoteConfigCoreService.apiKey = `apiKey`;

      configServiceGetUpdatedStringSpy = jest.spyOn(configService, `getUpdatedString`).mockReturnValue(`dummy-api-key`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateApiKey(apiKey);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `QuoteConfigMutatorService`,
        newValue: `dummy-api-key`,
        oldValue: `apiKey`,
        valueName: `api key`,
      } as IConfigUpdateString);
    });

    it(`should update the config API key with the updated string`, (): void => {
      expect.assertions(1);

      service.updateApiKey(apiKey);

      expect(quoteConfigCoreService.apiKey).toStrictEqual(`dummy-api-key`);
    });
  });
});
