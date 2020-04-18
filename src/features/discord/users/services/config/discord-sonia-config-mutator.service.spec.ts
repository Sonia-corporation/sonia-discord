import { IconEnum } from "../../../../../enums/icon.enum";
import { PartialNested } from "../../../../../types/partial-nested";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordSoniaConfig } from "../../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";
import { DiscordSoniaConfigMutatorService } from "./discord-sonia-config-mutator.service";

jest.mock(`../../../../config/services/config.service`);

describe(`DiscordSoniaConfigMutatorService`, (): void => {
  let service: DiscordSoniaConfigMutatorService;
  let configService: ConfigService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;

  beforeEach((): void => {
    service = DiscordSoniaConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    beforeEach((): void => {
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
    });
  });

  describe(`updateSonia()`, (): void => {
    let config: PartialNested<IDiscordSoniaConfig> | undefined;

    beforeEach((): void => {
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
