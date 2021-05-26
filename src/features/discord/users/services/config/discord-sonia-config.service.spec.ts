import { DiscordSoniaConfigCoreService } from './discord-sonia-config-core.service';
import { DiscordSoniaConfigService } from './discord-sonia-config.service';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { IDiscordSoniaConfig } from '../../../interfaces/discord-sonia-config';
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from '../../../interfaces/discord-sonia-corporation-message-embed-author-config';
import { Guild } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordSoniaConfigService`, (): void => {
  let service: DiscordSoniaConfigService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordSoniaConfig service`, (): void => {
      expect.assertions(1);

      service = DiscordSoniaConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordSoniaConfigService));
    });

    it(`should return the created DiscordSoniaConfig service`, (): void => {
      expect.assertions(1);

      const result = DiscordSoniaConfigService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordSoniaConfig service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordSoniaConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_CONFIG_SERVICE
      );
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = DiscordSoniaConfigService.getInstance();
      discordSoniaConfigCoreService.corporationImageUrl = IconEnum.GIRL;
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
      discordSoniaConfigCoreService.devGuildIdWhitelist = [`dummy-guild-id`];
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
        devGuildIdWhitelist: [`dummy-guild-id`],
        id: `dummy-id`,
        secretToken: `dummy-secret-token`,
      } as IDiscordSoniaConfig);
    });
  });

  describe(`getCorporationImageUrl()`, (): void => {
    beforeEach((): void => {
      service = DiscordSoniaConfigService.getInstance();
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
      service = DiscordSoniaConfigService.getInstance();
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
      service = DiscordSoniaConfigService.getInstance();
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
      service = DiscordSoniaConfigService.getInstance();
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
      service = DiscordSoniaConfigService.getInstance();
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url = `dummy-url`;
    });

    it(`should return the Discord Sonia config corporation message embed author url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthorUrl();

      expect(result).toStrictEqual(`dummy-url`);
    });
  });

  describe(`getDevGuildIdWhitelist()`, (): void => {
    beforeEach((): void => {
      service = DiscordSoniaConfigService.getInstance();
      discordSoniaConfigCoreService.devGuildIdWhitelist = [`dummy-guild-id`];
    });

    it(`should return the Discord Sonia dev guild id whitelist`, (): void => {
      expect.assertions(1);

      const result = service.getDevGuildIdWhitelist();

      expect(result).toStrictEqual([`dummy-guild-id`]);
    });
  });

  describe(`isGuildWhitelistedInDev()`, (): void => {
    let guild: Guild;

    beforeEach((): void => {
      service = DiscordSoniaConfigService.getInstance();
      guild = createHydratedMock<Guild>();
      discordSoniaConfigCoreService.devGuildIdWhitelist = [`dummy-guild-id`];
    });

    describe(`when the given guild has its id not whitelisted`, (): void => {
      beforeEach((): void => {
        guild.id = `guild-id`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isGuildWhitelistedInDev(guild);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given guild has its id whitelisted`, (): void => {
      beforeEach((): void => {
        guild.id = `dummy-guild-id`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isGuildWhitelistedInDev(guild);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`getId()`, (): void => {
    beforeEach((): void => {
      service = DiscordSoniaConfigService.getInstance();
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
      service = DiscordSoniaConfigService.getInstance();
      discordSoniaConfigCoreService.secretToken = `dummy-secret-token`;
    });

    it(`should return the Discord Sonia config secret token`, (): void => {
      expect.assertions(1);

      const result = service.getSecretToken();

      expect(result).toStrictEqual(`dummy-secret-token`);
    });
  });
});
