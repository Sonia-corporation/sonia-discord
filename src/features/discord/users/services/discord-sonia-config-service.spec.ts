import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { IDiscordSoniaConfig } from "../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DISCORD_SONIA_CONFIG } from "../constants/discord-sonia-config";
import { DiscordSoniaConfigService } from "./discord-sonia-config-service";

jest.mock(`../../../config/services/config-service`);

describe(`DiscordSoniaConfigService`, (): void => {
  let service: DiscordSoniaConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = DiscordSoniaConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getSonia()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.corporationImageUrl = `dummy-corporation-image-url`;
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
      DISCORD_SONIA_CONFIG.id = `dummy-id`;
      DISCORD_SONIA_CONFIG.secretToken = `dummy-secret-token`;
    });

    it(`should return the Discord Sonia config`, (): void => {
      expect.assertions(1);

      const result = service.getSonia();

      expect(result).toStrictEqual({
        corporationImageUrl: `dummy-corporation-image-url`,
        corporationMessageEmbedAuthor: {
          iconURL: `dummy-icon-url`,
          name: `dummy-name`,
          url: `dummy-url`,
        },
        id: `dummy-id`,
        secretToken: `dummy-secret-token`,
      } as IDiscordSoniaConfig);
    });
  });

  describe(`getCorporationImageUrl()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.corporationImageUrl = `dummy-corporation-image-url`;
    });

    it(`should return the Discord Sonia config corporation image url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationImageUrl();

      expect(result).toStrictEqual(`dummy-corporation-image-url`);
    });
  });

  describe(`updateCorporationImageUrl()`, (): void => {
    let corporationImageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      corporationImageUrl = `dummy-corporation-image-url`;
      DISCORD_SONIA_CONFIG.corporationImageUrl = `corporation-image-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-corporation-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationImageUrl(corporationImageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigService`,
        newValue: `dummy-corporation-image-url`,
        oldValue: `corporation-image-url`,
        valueName: `corporation image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationImageUrl(corporationImageUrl);

      expect(DISCORD_SONIA_CONFIG.corporationImageUrl).toStrictEqual(
        `dummy-corporation-image-url`
      );
    });
  });

  describe(`getCorporationMessageEmbedAuthor()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
    });

    it(`should return the Discord Sonia config corporation message embed author`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthor();

      expect(result).toStrictEqual({
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
    });
  });

  describe(`getCorporationMessageEmbedAuthorIconUrl()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL = `dummy-icon-url`;
    });

    it(`should return the Discord Sonia config corporation message embed author icon url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorIconUrl();

      expect(result).toStrictEqual(`dummy-icon-url`);
    });
  });

  describe(`updateCorporationMessageEmbedAuthorIconUrl()`, (): void => {
    let iconUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      iconUrl = `dummy-icon-url`;
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL = `icon-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-icon-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationMessageEmbedAuthorIconUrl(iconUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigService`,
        newValue: `dummy-icon-url`,
        oldValue: `icon-url`,
        valueName: `corporation message embed author icon url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation message embed author icon url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationMessageEmbedAuthorIconUrl(iconUrl);

      expect(
        DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL
      ).toStrictEqual(`dummy-icon-url`);
    });
  });

  describe(`getCorporationMessageEmbedAuthorName()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name = `dummy-name`;
    });

    it(`should return the Discord Sonia config corporation message embed author name`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorName();

      expect(result).toStrictEqual(`dummy-name`);
    });
  });

  describe(`updateCorporationMessageEmbedAuthorName()`, (): void => {
    let name: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      name = `dummy-name`;
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name = `name`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-name`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationMessageEmbedAuthorName(name);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigService`,
        newValue: `dummy-name`,
        oldValue: `name`,
        valueName: `corporation message embed author name`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation message embed author name with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationMessageEmbedAuthorName(name);

      expect(
        DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name
      ).toStrictEqual(`dummy-name`);
    });
  });

  describe(`getCorporationMessageEmbedAuthorUrl()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url = `dummy-url`;
    });

    it(`should return the Discord Sonia config corporation message embed author url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorUrl();

      expect(result).toStrictEqual(`dummy-url`);
    });
  });

  describe(`updateCorporationMessageEmbedAuthorUrl()`, (): void => {
    let url: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      url = `dummy-url`;
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url = `url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationMessageEmbedAuthorUrl(url);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigService`,
        newValue: `dummy-url`,
        oldValue: `url`,
        valueName: `corporation message embed author url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation message embed author url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationMessageEmbedAuthorUrl(url);

      expect(
        DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url
      ).toStrictEqual(`dummy-url`);
    });
  });

  describe(`getId()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.id = `dummy-id`;
    });

    it(`should return the Discord Sonia config id`, (): void => {
      expect.assertions(1);

      const result = service.getId();

      expect(result).toStrictEqual(`dummy-id`);
    });
  });

  describe(`updateId()`, (): void => {
    let id: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      id = `dummy-id`;
      DISCORD_SONIA_CONFIG.id = `id`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-id`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateId(id);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigService`,
        isValueHidden: true,
        newValue: `dummy-id`,
        oldValue: `id`,
        valueName: `id`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config id with the updated string`, (): void => {
      expect.assertions(1);

      service.updateId(id);

      expect(DISCORD_SONIA_CONFIG.id).toStrictEqual(`dummy-id`);
    });
  });

  describe(`getSecretToken()`, (): void => {
    beforeEach((): void => {
      DISCORD_SONIA_CONFIG.secretToken = `dummy-secret-token`;
    });

    it(`should return the Discord Sonia config secret token`, (): void => {
      expect.assertions(1);

      const result = service.getSecretToken();

      expect(result).toStrictEqual(`dummy-secret-token`);
    });
  });

  describe(`updateSecretToken()`, (): void => {
    let secretToken: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      secretToken = `dummy-secret-token`;
      DISCORD_SONIA_CONFIG.secretToken = `secret-token`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-secret-token`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateSecretToken(secretToken);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigService`,
        isValueHidden: true,
        newValue: `dummy-secret-token`,
        oldValue: `secret-token`,
        valueName: `secret token`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config secret token with the updated string`, (): void => {
      expect.assertions(1);

      service.updateSecretToken(secretToken);

      expect(DISCORD_SONIA_CONFIG.secretToken).toStrictEqual(
        `dummy-secret-token`
      );
    });
  });
});
