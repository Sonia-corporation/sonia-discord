import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core.service";
import { DiscordGuildConfigService } from "./discord-guild-config.service";

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
      discordGuildConfigCoreService.shouldSendIlEstMidiMessage = true;
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
      discordGuildConfigCoreService.soniaGuildId = `dummy-sonia-guild-id`;
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    it(`should return the Discord guild config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        shouldSendCookiesOnCreate: true,
        shouldSendIlEstMidiMessage: true,
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

      const shouldSendCookiesOnCreateResult = service.shouldSendCookiesOnCreate();

      expect(shouldSendCookiesOnCreateResult).toStrictEqual(true);
    });
  });

  describe(`shouldSendIlEstMidiMessage()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.shouldSendIlEstMidiMessage = true;
    });

    it(`should return the Discord guild config send il est midi message state`, (): void => {
      expect.assertions(1);

      const shouldSendCookiesOnCreateResult = service.shouldSendIlEstMidiMessage();

      expect(shouldSendCookiesOnCreateResult).toStrictEqual(true);
    });
  });

  describe(`shouldWelcomeNewMembers()`, (): void => {
    beforeEach((): void => {
      service = DiscordGuildConfigService.getInstance();
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
    });

    it(`should return the Discord guild config welcome new members state`, (): void => {
      expect.assertions(1);

      const shouldSendCookiesOnCreateResult = service.shouldWelcomeNewMembers();

      expect(shouldSendCookiesOnCreateResult).toStrictEqual(true);
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

      expect(result).toStrictEqual(`dummy-sonia-guild-id`);
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

      expect(result).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });
  });
});
