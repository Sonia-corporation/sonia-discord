import { DiscordMessageCommandFeatureReleaseNotesConfigCoreService } from './discord-message-command-feature-release-notes-config-core.service';
import { DiscordMessageCommandFeatureReleaseNotesConfigMutatorService } from './discord-message-command-feature-release-notes-config-mutator.service';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from './discord-message-command-feature-release-notes-config.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../../../../../../../types/partial-nested';
import { IConfigUpdateNumber } from '../../../../../../../../../config/interfaces/config-update-number';
import { IConfigUpdateString } from '../../../../../../../../../config/interfaces/config-update-string';
import { ConfigService } from '../../../../../../../../../config/services/config.service';
import { CoreEventService } from '../../../../../../../../../core/services/core-event.service';
import { LoggerService } from '../../../../../../../../../logger/services/logger.service';
import { IDiscordMessageCommandFeatureConfig } from '../../../../interfaces/discord-message-command-feature-config';
import { IDiscordMessageCommandFeatureReleaseNotesConfig } from '../../interfaces/discord-message-command-feature-release-notes-config';

jest.mock(`../../../../../../../../../time/services/time.service`);
jest.mock(`../../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureReleaseNotesConfigMutatorService`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesConfigMutatorService;
  let configService: ConfigService;
  let discordMessageCommandFeatureReleaseNotesConfigCoreService: DiscordMessageCommandFeatureReleaseNotesConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    discordMessageCommandFeatureReleaseNotesConfigCoreService =
      DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureConfig> | undefined;

    beforeEach((): void => {
      config = {
        releaseNotes: {
          unknown: {
            imageColor: ColorEnum.DESERT,
            imageUrl: IconEnum.NEW_PRODUCT,
          },
        },
      };
    });

    it(`should create a DiscordMessageCommandFeatureReleaseNotesConfigMutator service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureReleaseNotesConfigMutatorService));
    });

    it(`should return the created DiscordMessageCommandFeatureReleaseNotesConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureReleaseNotesConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current command feature release notes image color`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor = ColorEnum.DESERT;

        service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor).toStrictEqual(
          ColorEnum.DESERT
        );
      });

      it(`should not update the current command feature release notes image url`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl = IconEnum.NEW_PRODUCT;

        service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl).toStrictEqual(
          IconEnum.NEW_PRODUCT
        );
      });
    });

    describe(`when the given config is an object which does not configure the unknown release notes`, (): void => {
      beforeEach((): void => {
        config = {
          releaseNotes: {
            mixed: {
              imageColor: ColorEnum.DESERT,
              imageUrl: IconEnum.NEW_PRODUCT,
            },
          },
        };
      });

      it(`should not update the current command feature release notes image color`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor = ColorEnum.DESERT;

        service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor).toStrictEqual(
          ColorEnum.DESERT
        );
      });

      it(`should not update the current command feature release notes image url`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl = IconEnum.NEW_PRODUCT;

        service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl).toStrictEqual(
          IconEnum.NEW_PRODUCT
        );
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          releaseNotes: {
            unknown: {
              imageColor: ColorEnum.DESERT,
              imageUrl: IconEnum.NEW_PRODUCT,
            },
          },
        };
      });

      it(`should override the command feature release notes image color`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor = ColorEnum.MINT;

        service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor).toStrictEqual(
          ColorEnum.DESERT
        );
      });

      it(`should override the command feature release notes image url`, (): void => {
        expect.assertions(1);
        discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl = IconEnum.WARNING_SHIELD;

        service = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl).toStrictEqual(
          IconEnum.NEW_PRODUCT
        );
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      discordMessageCommandFeatureReleaseNotesConfigCoreServiceGetInstanceSpy = jest.spyOn(
        DiscordMessageCommandFeatureReleaseNotesConfigCoreService,
        `getInstance`
      );
      discordMessageCommandFeatureReleaseNotesConfigServiceGetInstanceSpy = jest.spyOn(
        DiscordMessageCommandFeatureReleaseNotesConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledOnce();
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordMessageCommandFeatureReleaseNotesConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordMessageCommandFeatureReleaseNotesConfigCoreServiceGetInstanceSpy).toHaveBeenCalledOnce();
      expect(discordMessageCommandFeatureReleaseNotesConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordMessageCommandFeatureReleaseNotesConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordMessageCommandFeatureReleaseNotesConfigServiceGetInstanceSpy).toHaveBeenCalledOnce();
      expect(discordMessageCommandFeatureReleaseNotesConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance();
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes = {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      };

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes).toStrictEqual({
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      } as IDiscordMessageCommandFeatureReleaseNotesConfig);
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

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.NEW_PRODUCT,
        } as IDiscordMessageCommandFeatureReleaseNotesConfig);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains a release notes config without the unknown release notes configuration`, (): void => {
      beforeEach((): void => {
        config = {
          releaseNotes: {
            mixed: {
              imageColor: ColorEnum.DESERT,
              imageUrl: IconEnum.NEW_PRODUCT,
            },
          },
        };
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateConfig();

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.NEW_PRODUCT,
        } as IDiscordMessageCommandFeatureReleaseNotesConfig);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledOnce();
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordMessageCommandFeatureReleaseNotesConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a release notes config with the unknown release notes configuration`, (): void => {
      beforeEach((): void => {
        config = {
          releaseNotes: {
            unknown: {
              imageColor: ColorEnum.DESERT,
              imageUrl: IconEnum.NEW_PRODUCT,
            },
          },
        };
      });

      it(`should update the release notes config`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.NEW_PRODUCT,
        } as IDiscordMessageCommandFeatureReleaseNotesConfig);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(3);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordMessageCommandFeatureReleaseNotesConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateReleaseNotes()`, (): void => {
    let config: IPartialNested<IDiscordMessageCommandFeatureReleaseNotesConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance();
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes = {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateReleaseNotes(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes).toStrictEqual({
          imageColor: ColorEnum.DESERT,
          imageUrl: IconEnum.NEW_PRODUCT,
        } as IDiscordMessageCommandFeatureReleaseNotesConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the release notes config image color`, (): void => {
        expect.assertions(1);

        service.updateReleaseNotes(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor).toStrictEqual(
          ColorEnum.MINT
        );
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the release notes config image url`, (): void => {
        expect.assertions(1);

        service.updateReleaseNotes(config);

        expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl).toStrictEqual(
          IconEnum.INFORMATION
        );
      });
    });
  });

  describe(`updateMessageWarningImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance();
      imageColor = ColorEnum.SUN;
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor = ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest.spyOn(configService, `getUpdatedNumber`).mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateReleaseNotesImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledOnce();
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureReleaseNotesConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command feature release notes color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message command feature release notes config image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateReleaseNotesImageColor(imageColor);

      expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor).toStrictEqual(
        ColorEnum.SUN
      );
    });
  });

  describe(`updateReleaseNotesImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigMutatorService.getInstance();
      imageUrl = IconEnum.GIRL;
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl = IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest.spyOn(configService, `getUpdatedString`).mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateReleaseNotesImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledOnce();
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureReleaseNotesConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command feature release notes image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message command feature release notes config image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateReleaseNotesImageUrl(imageUrl);

      expect(discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl).toStrictEqual(
        IconEnum.GIRL
      );
    });
  });
});
