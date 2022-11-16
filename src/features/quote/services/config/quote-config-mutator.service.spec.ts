import { QuoteConfigCoreService } from './quote-config-core.service';
import { QuoteConfigMutatorService } from './quote-config-mutator.service';
import { QuoteConfigService } from './quote-config.service';
import { ColorEnum } from '../../../../enums/color.enum';
import { IconEnum } from '../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../types/partial-nested';
import { IConfigUpdateNumber } from '../../../config/interfaces/config-update-number';
import { IConfigUpdateString } from '../../../config/interfaces/config-update-string';
import { ConfigService } from '../../../config/services/config.service';
import { CoreEventService } from '../../../core/services/core-event.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { IQuoteConfig } from '../../interfaces/quote-config';

jest.mock(`../../../time/services/time.service`);
jest.mock(`../../../logger/services/chalk/chalk.service`);

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
        authorIconUrl: IconEnum.ERROR,
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.ERROR,
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

        expect(quoteConfigCoreService.apiKey).toBe(`apiKey`);
      });

      it(`should not update the current author icon url`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.authorIconUrl = IconEnum.ERROR;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.authorIconUrl).toStrictEqual(IconEnum.ERROR);
      });

      it(`should not update the current image color`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.imageColor = ColorEnum.SUN;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.imageColor).toStrictEqual(ColorEnum.SUN);
      });

      it(`should not update the current image url`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.imageUrl = IconEnum.ERROR;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.imageUrl).toStrictEqual(IconEnum.ERROR);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          apiKey: `dummy-api-key`,
          authorIconUrl: IconEnum.ERROR,
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ERROR,
        };
      });

      it(`should override the API key`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.apiKey = `apiKey`;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.apiKey).toBe(`dummy-api-key`);
      });

      it(`should override the author icon url`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.authorIconUrl = IconEnum.MOTIVATION_DAILY_QUOTES;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.authorIconUrl).toStrictEqual(IconEnum.ERROR);
      });

      it(`should override the image color`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.imageColor = ColorEnum.DEAD;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.imageColor).toStrictEqual(ColorEnum.SUN);
      });

      it(`should override the image url`, (): void => {
        expect.assertions(1);
        quoteConfigCoreService.imageUrl = IconEnum.MOTIVATION_DAILY_QUOTES;

        service = new QuoteConfigMutatorService(config);

        expect(quoteConfigCoreService.imageUrl).toStrictEqual(IconEnum.ERROR);
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
      quoteConfigCoreService.authorIconUrl = IconEnum.MOTIVATION_DAILY_QUOTES;
      quoteConfigCoreService.imageColor = ColorEnum.CANDY;
      quoteConfigCoreService.imageUrl = IconEnum.MOTIVATION_DAILY_QUOTES;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(4);

      service.updateConfig();

      expect(quoteConfigCoreService.apiKey).toBe(`dummy-api-key`);
      expect(quoteConfigCoreService.authorIconUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
      expect(quoteConfigCoreService.imageColor).toStrictEqual(ColorEnum.CANDY);
      expect(quoteConfigCoreService.imageUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
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
        expect.assertions(4);

        service.updateConfig();

        expect(quoteConfigCoreService.apiKey).toBe(`dummy-api-key`);
        expect(quoteConfigCoreService.authorIconUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
        expect(quoteConfigCoreService.imageColor).toStrictEqual(ColorEnum.CANDY);
        expect(quoteConfigCoreService.imageUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
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
          authorIconUrl: IconEnum.MOTIVATION_DAILY_QUOTES,
          imageColor: ColorEnum.CANDY,
          imageUrl: IconEnum.MOTIVATION_DAILY_QUOTES,
        };
      });

      it(`should update the config API key`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(quoteConfigCoreService.apiKey).toBe(`apiKey`);
      });

      it(`should update the config author icon url`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(quoteConfigCoreService.authorIconUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
      });

      it(`should update the config image color`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(quoteConfigCoreService.imageColor).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should update the config image url`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(quoteConfigCoreService.imageUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(5);
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
        isValueHidden: true,
        newValue: `dummy-api-key`,
        oldValue: `apiKey`,
        valueName: `api key`,
      } as IConfigUpdateString);
    });

    it(`should update the config API key with the updated string`, (): void => {
      expect.assertions(1);

      service.updateApiKey(apiKey);

      expect(quoteConfigCoreService.apiKey).toBe(`dummy-api-key`);
    });
  });

  describe(`updateAuthorIconUrl()`, (): void => {
    let authorIconUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = QuoteConfigMutatorService.getInstance();
      authorIconUrl = IconEnum.MOTIVATION_DAILY_QUOTES;
      quoteConfigCoreService.authorIconUrl = IconEnum.ERROR;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.MOTIVATION_DAILY_QUOTES);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateAuthorIconUrl(authorIconUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `QuoteConfigMutatorService`,
        newValue: IconEnum.MOTIVATION_DAILY_QUOTES,
        oldValue: IconEnum.ERROR,
        valueName: `author icon url`,
      } as IConfigUpdateString);
    });

    it(`should update the config author icon url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateAuthorIconUrl(authorIconUrl);

      expect(quoteConfigCoreService.authorIconUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
    });
  });

  describe(`updateImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = QuoteConfigMutatorService.getInstance();
      imageColor = ColorEnum.CANDY;
      quoteConfigCoreService.imageColor = ColorEnum.DEAD;

      configServiceGetUpdatedNumberSpy = jest.spyOn(configService, `getUpdatedNumber`).mockReturnValue(ColorEnum.CANDY);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `QuoteConfigMutatorService`,
        newValue: ColorEnum.CANDY,
        oldValue: ColorEnum.DEAD,
        valueName: `image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the config image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateImageColor(imageColor);

      expect(quoteConfigCoreService.imageColor).toStrictEqual(ColorEnum.CANDY);
    });
  });

  describe(`updateImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = QuoteConfigMutatorService.getInstance();
      imageUrl = IconEnum.MOTIVATION_DAILY_QUOTES;
      quoteConfigCoreService.imageUrl = IconEnum.ERROR;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.MOTIVATION_DAILY_QUOTES);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `QuoteConfigMutatorService`,
        newValue: IconEnum.MOTIVATION_DAILY_QUOTES,
        oldValue: IconEnum.ERROR,
        valueName: `image url`,
      } as IConfigUpdateString);
    });

    it(`should update the config image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateImageUrl(imageUrl);

      expect(quoteConfigCoreService.imageUrl).toStrictEqual(IconEnum.MOTIVATION_DAILY_QUOTES);
    });
  });
});
