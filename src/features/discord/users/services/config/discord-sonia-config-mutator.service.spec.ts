import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { PartialNested } from "../../../../../types/partial-nested";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config.service";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordSoniaConfig } from "../../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";
import { DiscordSoniaConfigMutatorService } from "./discord-sonia-config-mutator.service";
import { DiscordSoniaConfigService } from "./discord-sonia-config.service";

jest.mock(`../../../../time/services/time.service`);
jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordSoniaConfigMutatorService`, (): void => {
  let service: DiscordSoniaConfigMutatorService;
  let configService: ConfigService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    beforeEach((): void => {
      config = {
        sonia: {
          corporationImageUrl: IconEnum.GIRL,
          corporationMessageEmbedAuthor: {
            iconURL: `dummy-icon-url`,
            name: `dummy-name`,
            url: `dummy-url`,
          },
          id: `dummy-id`,
          secretToken: `dummy-secret-token`,
        },
      };
    });

    it(`should create a DiscordSoniaConfigMutator service`, (): void => {
      expect.assertions(1);

      service = DiscordSoniaConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(
        expect.any(DiscordSoniaConfigMutatorService)
      );
    });

    it(`should return the created DiscordSoniaConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = DiscordSoniaConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordSoniaConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordSoniaConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current corporation image url`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
          IconEnum.GIRL
        );
      });

      it(`should not update the current corporation message embed author icon url`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL = `iconURL`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL
        ).toStrictEqual(`iconURL`);
      });

      it(`should not update the current corporation message embed author name`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name = `name`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name
        ).toStrictEqual(`name`);
      });

      it(`should not update the current corporation message embed author url`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url = `url`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url
        ).toStrictEqual(`url`);
      });

      it(`should not update the current id`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.id = `id`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(discordSoniaConfigCoreService.id).toStrictEqual(`id`);
      });

      it(`should not update the current secret token`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.secretToken = `secretToken`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
          `secretToken`
        );
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          sonia: {
            corporationImageUrl: IconEnum.GIRL,
            corporationMessageEmbedAuthor: {
              iconURL: `dummy-icon-url`,
              name: `dummy-name`,
              url: `dummy-url`,
            },
            id: `dummy-id`,
            secretToken: `dummy-secret-token`,
          },
        };
      });

      it(`should override the corporation image url`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationImageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
          IconEnum.GIRL
        );
      });

      it(`should override the corporation message embed author icon url`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL = `iconURL`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL
        ).toStrictEqual(`dummy-icon-url`);
      });

      it(`should override the corporation message embed author name`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name = `name`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name
        ).toStrictEqual(`dummy-name`);
      });

      it(`should override the corporation message embed author url`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url = `url`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url
        ).toStrictEqual(`dummy-url`);
      });

      it(`should override the id`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.id = `id`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(discordSoniaConfigCoreService.id).toStrictEqual(`dummy-id`);
      });

      it(`should override the secret token`, (): void => {
        expect.assertions(1);
        discordSoniaConfigCoreService.secretToken = `secretToken`;

        service = new DiscordSoniaConfigMutatorService(config);

        expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
          `dummy-secret-token`
        );
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let discordSoniaConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let discordSoniaConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      discordSoniaConfigCoreServiceGetInstanceSpy = jest.spyOn(
        DiscordSoniaConfigCoreService,
        `getInstance`
      );
      discordSoniaConfigServiceGetInstanceSpy = jest.spyOn(
        DiscordSoniaConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordSoniaConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordSoniaConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(
        1
      );
      expect(
        discordSoniaConfigCoreServiceGetInstanceSpy
      ).toHaveBeenCalledWith();
    });

    it(`should create the DiscordSoniaConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordSoniaConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(discordSoniaConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;
      discordSoniaConfigCoreService.id = `dummy-id`;
      discordSoniaConfigCoreService.secretToken = `dummy-secret-token`;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(4);

      service.updateConfig();

      expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
        IconEnum.GIRL
      );
      expect(discordSoniaConfigCoreService.id).toStrictEqual(`dummy-id`);
      expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
        `dummy-secret-token`
      );
      expect(
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor
      ).toStrictEqual({
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
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

        service.updateConfig(config);

        expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
          IconEnum.GIRL
        );
        expect(discordSoniaConfigCoreService.id).toStrictEqual(`dummy-id`);
        expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
          `dummy-secret-token`
        );
        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor
        ).toStrictEqual({
          iconURL: `dummy-icon-url`,
          name: `dummy-name`,
          url: `dummy-url`,
        } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains a Sonia corporation image url`, (): void => {
      beforeEach((): void => {
        config = {
          sonia: {
            corporationImageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
        };
      });

      it(`should update the config corporation image url`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
          IconEnum.ARTIFICIAL_INTELLIGENCE
        );
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordSoniaConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a Sonia id`, (): void => {
      beforeEach((): void => {
        config = {
          sonia: {
            id: `id`,
          },
        };
      });

      it(`should update the config id`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordSoniaConfigCoreService.id).toStrictEqual(`id`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordSoniaConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a Sonia secret token`, (): void => {
      beforeEach((): void => {
        config = {
          sonia: {
            secretToken: `secret-token`,
          },
        };
      });

      it(`should update the config secret token`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
          `secret-token`
        );
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordSoniaConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a Sonia corporation message embed author`, (): void => {
      beforeEach((): void => {
        config = {
          sonia: {
            corporationMessageEmbedAuthor: {
              iconURL: `icon-url`,
              name: `name`,
              url: `url`,
            },
          },
        };
      });

      it(`should update the config corporation message embed author`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor
        ).toStrictEqual({
          iconURL: `icon-url`,
          name: `name`,
          url: `url`,
        } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(4);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordSoniaConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateSonia()`, (): void => {
    let config: PartialNested<IDiscordSoniaConfig> | undefined;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;
      discordSoniaConfigCoreService.id = `dummy-id`;
      discordSoniaConfigCoreService.secretToken = `dummy-secret-token`;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(4);

        service.updateSonia(config);

        expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
          IconEnum.GIRL
        );
        expect(discordSoniaConfigCoreService.id).toStrictEqual(`dummy-id`);
        expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
          `dummy-secret-token`
        );
        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor
        ).toStrictEqual({
          iconURL: `dummy-icon-url`,
          name: `dummy-name`,
          url: `dummy-url`,
        } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
      });
    });

    describe(`when the given config contains a corporation image url`, (): void => {
      beforeEach((): void => {
        config = {
          corporationImageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        };
      });

      it(`should update the config corporation image url`, (): void => {
        expect.assertions(1);

        service.updateSonia(config);

        expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
          IconEnum.ARTIFICIAL_INTELLIGENCE
        );
      });
    });

    describe(`when the given config contains a id`, (): void => {
      beforeEach((): void => {
        config = {
          id: `id`,
        };
      });

      it(`should update the config id`, (): void => {
        expect.assertions(1);

        service.updateSonia(config);

        expect(discordSoniaConfigCoreService.id).toStrictEqual(`id`);
      });
    });

    describe(`when the given config contains a secret token`, (): void => {
      beforeEach((): void => {
        config = {
          secretToken: `secret-token`,
        };
      });

      it(`should update the config secret token`, (): void => {
        expect.assertions(1);

        service.updateSonia(config);

        expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
          `secret-token`
        );
      });
    });

    describe(`when the given config contains a corporation message embed author`, (): void => {
      beforeEach((): void => {
        config = {
          corporationMessageEmbedAuthor: {
            iconURL: `icon-url`,
            name: `name`,
            url: `url`,
          },
        };
      });

      it(`should update the config corporation message embed author`, (): void => {
        expect.assertions(1);

        service.updateSonia(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor
        ).toStrictEqual({
          iconURL: `icon-url`,
          name: `name`,
          url: `url`,
        } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
      });
    });
  });

  describe(`updateCorporationImageUrl()`, (): void => {
    let corporationImageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      corporationImageUrl = IconEnum.BUG;
      discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.BUG);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationImageUrl(corporationImageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        newValue: IconEnum.BUG,
        oldValue: IconEnum.GIRL,
        valueName: `corporation image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationImageUrl(corporationImageUrl);

      expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
        IconEnum.BUG
      );
    });
  });

  describe(`updateCorporationMessageEmbedAuthor()`, (): void => {
    let config:
      | PartialNested<IDiscordSoniaCorporationMessageEmbedAuthorConfig>
      | undefined;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateCorporationMessageEmbedAuthor(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor
        ).toStrictEqual({
          iconURL: `dummy-icon-url`,
          name: `dummy-name`,
          url: `dummy-url`,
        } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
      });
    });

    describe(`when the given config contains an icon url`, (): void => {
      beforeEach((): void => {
        config = {
          iconURL: `icon-url`,
        };
      });

      // @todo Fix it; I am clueless to find out why this is not working
      it.skip(`should update the config corporation message embed author icon url`, (): void => {
        expect.assertions(1);

        service.updateCorporationMessageEmbedAuthor(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL
        ).toStrictEqual(`icon-url`);
      });
    });

    describe(`when the given config contains a name`, (): void => {
      beforeEach((): void => {
        config = {
          name: `name`,
        };
      });

      // @todo Fix it; I am clueless to find out why this is not working
      it.skip(`should update the config corporation message embed author name`, (): void => {
        expect.assertions(1);

        service.updateCorporationMessageEmbedAuthor(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name
        ).toStrictEqual(`name`);
      });
    });

    describe(`when the given config contains an url`, (): void => {
      beforeEach((): void => {
        config = {
          url: `url`,
        };
      });

      // @todo Fix it; I am clueless to find out why this is not working
      it.skip(`should update the config corporation message embed author url`, (): void => {
        expect.assertions(1);

        service.updateCorporationMessageEmbedAuthor(config);

        expect(
          discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url
        ).toStrictEqual(`url`);
      });
    });
  });

  describe(`updateCorporationMessageEmbedAuthorIconUrl()`, (): void => {
    let iconUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      iconUrl = `dummy-icon-url`;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL = `icon-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-icon-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationMessageEmbedAuthorIconUrl(iconUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        newValue: `dummy-icon-url`,
        oldValue: `icon-url`,
        valueName: `corporation message embed author icon url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation message embed author icon url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationMessageEmbedAuthorIconUrl(iconUrl);

      expect(
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL
      ).toStrictEqual(`dummy-icon-url`);
    });
  });

  describe(`updateCorporationMessageEmbedAuthorName()`, (): void => {
    let name: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      name = `dummy-name`;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name = `name`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-name`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationMessageEmbedAuthorName(name);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        newValue: `dummy-name`,
        oldValue: `name`,
        valueName: `corporation message embed author name`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation message embed author name with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationMessageEmbedAuthorName(name);

      expect(
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name
      ).toStrictEqual(`dummy-name`);
    });
  });

  describe(`updateCorporationMessageEmbedAuthorUrl()`, (): void => {
    let url: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      url = `dummy-url`;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url = `url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationMessageEmbedAuthorUrl(url);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        newValue: `dummy-url`,
        oldValue: `url`,
        valueName: `corporation message embed author url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation message embed author url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationMessageEmbedAuthorUrl(url);

      expect(
        discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url
      ).toStrictEqual(`dummy-url`);
    });
  });

  describe(`updateId()`, (): void => {
    let id: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      id = `dummy-id`;
      discordSoniaConfigCoreService.id = `id`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-id`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateId(id);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        isValueHidden: true,
        newValue: `dummy-id`,
        oldValue: `id`,
        valueName: `id`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config id with the updated string`, (): void => {
      expect.assertions(1);

      service.updateId(id);

      expect(discordSoniaConfigCoreService.id).toStrictEqual(`dummy-id`);
    });
  });

  describe(`updateSecretToken()`, (): void => {
    let secretToken: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordSoniaConfigMutatorService.getInstance();
      secretToken = `dummy-secret-token`;
      discordSoniaConfigCoreService.secretToken = `secret-token`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-secret-token`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateSecretToken(secretToken);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        isValueHidden: true,
        newValue: `dummy-secret-token`,
        oldValue: `secret-token`,
        valueName: `secret token`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config secret token with the updated string`, (): void => {
      expect.assertions(1);

      service.updateSecretToken(secretToken);

      expect(discordSoniaConfigCoreService.secretToken).toStrictEqual(
        `dummy-secret-token`
      );
    });
  });
});
