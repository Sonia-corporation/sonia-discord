import { DiscordGuildConfigCoreService } from './discord-guild-config-core.service';
import { DiscordGuildConfigService } from './discord-guild-config.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { IDiscordGuildConfig } from '../../../interfaces/discord-guild-config';

describe(`DiscordGuildConfigService`, (): void => {
  let service: DiscordGuildConfigService;
  let discordGuildConfigCoreService: DiscordGuildConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildConfig service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildConfigService));
    });

    it(`should return the created DiscordGuildConfig service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildConfigService.getInstance();

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

    it(`should notify the DiscordGuildConfig service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_CONFIG_SERVICE
      );
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.shouldSendCookiesOnCreate = true;
      discordGuildConfigCoreService.shouldSendNoonMessage = true;
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
      discordGuildConfigCoreService.soniaGuildId = `dummy-sonia-guild-id`;
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    it(`should return the Discord guild config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        shouldSendCookiesOnCreate: true,
        shouldSendNoonMessage: true,
        shouldWelcomeNewMembers: true,
        soniaGuildId: `dummy-sonia-guild-id`,
        soniaPermanentGuildInviteUrl: `dummy-sonia-permanent-guild-invite-url`,
      } as IDiscordGuildConfig);
    });
  });

  describe(`shouldSendCookiesOnCreate()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.shouldSendCookiesOnCreate = true;
    });

    it(`should return the Discord guild config send cookies on create state`, (): void => {
      expect.assertions(1);

      const result = service.shouldSendCookiesOnCreate();

      expect(result).toBe(true);
    });
  });

  describe(`shouldSendNoonMessage()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.shouldSendNoonMessage = true;
    });

    it(`should return the Discord guild config send noon message state`, (): void => {
      expect.assertions(1);

      const result = service.shouldSendNoonMessage();

      expect(result).toBe(true);
    });
  });

  describe(`shouldWelcomeNewMembers()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
    });

    it(`should return the Discord guild config welcome new members state`, (): void => {
      expect.assertions(1);

      const result = service.shouldWelcomeNewMembers();

      expect(result).toBe(true);
    });
  });

  describe(`getSoniaGuildId()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.soniaGuildId = `dummy-sonia-guild-id`;
    });

    it(`should return the Discord guild config Sonia guild id`, (): void => {
      expect.assertions(1);

      const result = service.getSoniaGuildId();

      expect(result).toBe(`dummy-sonia-guild-id`);
    });
  });

  describe(`getSoniaPermanentGuildInviteUrl()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    it(`should return the Discord guild config Sonia permanent guild invite url`, (): void => {
      expect.assertions(1);

      const result = service.getSoniaPermanentGuildInviteUrl();

      expect(result).toBe(`dummy-sonia-permanent-guild-invite-url`);
    });
  });
});
