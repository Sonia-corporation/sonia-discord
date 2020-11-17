import { DiscordMessageCommandFeatureNoonConfigCoreService } from './discord-message-command-feature-noon-config-core.service';
import { DiscordMessageCommandFeatureNoonConfigMutatorService } from './discord-message-command-feature-noon-config-mutator.service';
import { DiscordMessageCommandFeatureNoonConfigService } from './discord-message-command-feature-noon-config.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../../../../../../../types/partial-nested';
import { IConfigUpdateNumber } from '../../../../../../../../../config/interfaces/config-update-number';
import { IConfigUpdateString } from '../../../../../../../../../config/interfaces/config-update-string';
import { ConfigService } from '../../../../../../../../../config/services/config.service';
import { CoreEventService } from '../../../../../../../../../core/services/core-event.service';
import { LoggerService } from '../../../../../../../../../logger/services/logger.service';
import { IDiscordMessageCommandFeatureConfig } from '../../interfaces/discord-message-command-feature-config';
import { IDiscordMessageCommandFeatureNoonConfig } from '../../interfaces/discord-message-command-feature-noon-config';

jest.mock(`../../../../../../../../../time/services/time.service`);
jest.mock(`../../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonConfigMutatorService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonConfigMutatorService;
  let configService: ConfigService;
  let discordMessageCommandFeatureNoonConfigCoreService: DiscordMessageCommandFeatureNoonConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    discordMessageCommandFeatureNoonConfigCoreService = DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureConfig> | undefined;

    beforeEach((): void => {
      config = {
        noon: {
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.ALARM,
        },
      };
    });

    it(`should create a DiscordMessageCommandFeatureNoonConfigMutator service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureNoonConfigMutatorService));
    });

    it(`should return the created DiscordMessageCommandFeatureNoonConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordMessageCommandFeatureNoonConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current command feature noon image color`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor = ColorEnum.DESERT;

        service = new DiscordMessageCommandFeatureNoonConfigMutatorService(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor).toStrictEqual(ColorEnum.DESERT);
      });

      it(`should not update the current command feature noon image url`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl = IconEnum.ALARM;

        service = new DiscordMessageCommandFeatureNoonConfigMutatorService(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl).toStrictEqual(IconEnum.ALARM);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          noon: {
            imageColor: ColorEnum.DESERT,
            imageUrl: IconEnum.ALARM,
          },
        };
      });

      it(`should override the command feature noon image color`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor = ColorEnum.MINT;

        service = new DiscordMessageCommandFeatureNoonConfigMutatorService(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor).toStrictEqual(ColorEnum.DESERT);
      });

      it(`should override the command feature noon image url`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl = IconEnum.WARNING_SHIELD;

        service = new DiscordMessageCommandFeatureNoonConfigMutatorService(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl).toStrictEqual(IconEnum.ALARM);
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      discordMessageCommandFeatureNoonConfigCoreServiceGetInstanceSpy = jest.spyOn(
        DiscordMessageCommandFeatureNoonConfigCoreService,
        `getInstance`
      );
      discordMessageCommandFeatureNoonConfigServiceGetInstanceSpy = jest.spyOn(
        DiscordMessageCommandFeatureNoonConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordMessageCommandFeatureNoonConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordMessageCommandFeatureNoonConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandFeatureNoonConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordMessageCommandFeatureNoonConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordMessageCommandFeatureNoonConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandFeatureNoonConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance();
      discordMessageCommandFeatureNoonConfigCoreService.noon = {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.ALARM,
      };

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(discordMessageCommandFeatureNoonConfigCoreService.noon).toStrictEqual({
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.ALARM,
      } as IDiscordMessageCommandFeatureNoonConfig);
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

        service.updateConfig();

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.ALARM,
        } as IDiscordMessageCommandFeatureNoonConfig);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains a noon config`, (): void => {
      beforeEach((): void => {
        config = {
          noon: {
            imageColor: ColorEnum.DESERT,
            imageUrl: IconEnum.ALARM,
          },
        };
      });

      it(`should update the noon config`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.ALARM,
        } as IDiscordMessageCommandFeatureNoonConfig);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(3);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordMessageCommandFeatureNoonConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateNoon()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureNoonConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance();
      discordMessageCommandFeatureNoonConfigCoreService.noon = {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.ALARM,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateNoon(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.ALARM,
        } as IDiscordMessageCommandFeatureNoonConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the noon config image color`, (): void => {
        expect.assertions(1);

        service.updateNoon(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the noon config image url`, (): void => {
        expect.assertions(1);

        service.updateNoon(config);

        expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageWarningImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance();
      imageColor = ColorEnum.SUN;
      discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor = ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest.spyOn(configService, `getUpdatedNumber`).mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateNoonImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureNoonConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command feature noon color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message command feature noon config image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateNoonImageColor(imageColor);

      expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateNoonImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigMutatorService.getInstance();
      imageUrl = IconEnum.GIRL;
      discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl = IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest.spyOn(configService, `getUpdatedString`).mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateNoonImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureNoonConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command feature noon image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message command feature noon config image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateNoonImageUrl(imageUrl);

      expect(discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl).toStrictEqual(IconEnum.GIRL);
    });
  });
});
