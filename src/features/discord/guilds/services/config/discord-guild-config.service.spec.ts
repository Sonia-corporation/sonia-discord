import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core.service";
import { DiscordGuildConfigService } from "./discord-guild-config.service";

jest.mock(`../../../../config/services/config.service`);

describe(`DiscordGuildConfigService`, (): void => {
  let service: DiscordGuildConfigService;
  let discordGuildConfigCoreService: DiscordGuildConfigCoreService;

  beforeEach((): void => {
    service = DiscordGuildConfigService.getInstance();
    discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
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
      discordGuildConfigCoreService.shouldSendCookiesOnCreate = true;
    });

    it(`should return the Discord guild config send cookies on create state`, (): void => {
      expect.assertions(1);

      const result = service.shouldSendCookiesOnCreate();

      expect(result).toStrictEqual(true);
    });
  });

  describe(`shouldSendIlEstMidiMessage()`, (): void => {
    beforeEach((): void => {
      discordGuildConfigCoreService.shouldSendIlEstMidiMessage = true;
    });

    it(`should return the Discord guild config send il est midi message state`, (): void => {
      expect.assertions(1);

      const result = service.shouldSendIlEstMidiMessage();

      expect(result).toStrictEqual(true);
    });
  });

  describe(`shouldWelcomeNewMembers()`, (): void => {
    beforeEach((): void => {
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
    });

    it(`should return the Discord guild config welcome new members state`, (): void => {
      expect.assertions(1);

      const result = service.shouldWelcomeNewMembers();

      expect(result).toStrictEqual(true);
    });
  });

  describe(`getSoniaGuildId()`, (): void => {
    beforeEach((): void => {
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
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    it(`should return the Discord guild config Sonia permanent guild invite url`, (): void => {
      expect.assertions(1);

      const result = service.getSoniaPermanentGuildInviteUrl();

      expect(result).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });
  });
});
