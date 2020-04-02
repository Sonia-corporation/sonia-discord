import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config-service";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core-service";
import { DiscordSoniaConfigMutatorService } from "./discord-sonia-config-mutator-service";

jest.mock(`../../../../config/services/config-service`);

describe(`DiscordSoniaConfigMutatorService`, (): void => {
  let service: DiscordSoniaConfigMutatorService;
  let configService: ConfigService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;

  beforeEach((): void => {
    service = DiscordSoniaConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
  });

  describe(`updateCorporationImageUrl()`, (): void => {
    let corporationImageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      corporationImageUrl = `dummy-corporation-image-url`;
      discordSoniaConfigCoreService.corporationImageUrl = `corporation-image-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-corporation-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateCorporationImageUrl(corporationImageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaConfigMutatorService`,
        newValue: `dummy-corporation-image-url`,
        oldValue: `corporation-image-url`,
        valueName: `corporation image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord Sonia config corporation image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateCorporationImageUrl(corporationImageUrl);

      expect(discordSoniaConfigCoreService.corporationImageUrl).toStrictEqual(
        `dummy-corporation-image-url`
      );
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
