import { IconEnum } from "../../../../../enums/icon.enum";
import { IDiscordSoniaConfig } from "../../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";
import { DiscordSoniaConfigService } from "./discord-sonia-config.service";

jest.mock(`../../../../config/services/config.service`);

describe(`DiscordSoniaConfigService`, (): void => {
  let service: DiscordSoniaConfigService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;

  beforeEach((): void => {
    service = DiscordSoniaConfigService.getInstance();
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
      discordSoniaConfigCoreService.id = `dummy-id`;
      discordSoniaConfigCoreService.secretToken = `dummy-secret-token`;
    });

    it(`should return the Discord Sonia config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        corporationImageUrl: IconEnum.GIRL,
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
      discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;
    });

    it(`should return the Discord Sonia config corporation image url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationImageUrl();

      expect(result).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`getCorporationMessageEmbedAuthor()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
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
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL = `dummy-icon-url`;
    });

    it(`should return the Discord Sonia config corporation message embed author icon url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorIconUrl();

      expect(result).toStrictEqual(`dummy-icon-url`);
    });
  });

  describe(`getCorporationMessageEmbedAuthorName()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name = `dummy-name`;
    });

    it(`should return the Discord Sonia config corporation message embed author name`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorName();

      expect(result).toStrictEqual(`dummy-name`);
    });
  });

  describe(`getCorporationMessageEmbedAuthorUrl()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url = `dummy-url`;
    });

    it(`should return the Discord Sonia config corporation message embed author url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorUrl();

      expect(result).toStrictEqual(`dummy-url`);
    });
  });

  describe(`getId()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.id = `dummy-id`;
    });

    it(`should return the Discord Sonia config id`, (): void => {
      expect.assertions(1);

      const result = service.getId();

      expect(result).toStrictEqual(`dummy-id`);
    });
  });

  describe(`getSecretToken()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.secretToken = `dummy-secret-token`;
    });

    it(`should return the Discord Sonia config secret token`, (): void => {
      expect.assertions(1);

      const result = service.getSecretToken();

      expect(result).toStrictEqual(`dummy-secret-token`);
    });
  });
});
