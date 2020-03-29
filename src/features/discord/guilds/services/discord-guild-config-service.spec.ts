import { IConfigUpdateBoolean } from '../../../config/interfaces/config-update-boolean';
import { IConfigUpdateString } from '../../../config/interfaces/config-update-string';
import { ConfigService } from '../../../config/services/config-service';
import { IDiscordGuildConfig } from '../../interfaces/discord-guild-config';
import { DISCORD_GUILD_CONFIG } from '../constants/discord-guild-config';
import { DiscordGuildConfigService } from './discord-guild-config-service';

jest.mock(`../../../config/services/config-service`);

describe(`DiscordGuildConfigService`, (): void => {
  let service: DiscordGuildConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = DiscordGuildConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getGuild()`, (): void => {
    beforeEach((): void => {
      DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers = true;
      DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    it(`should return the Discord guild config`, (): void => {
      expect.assertions(1);

      const result = service.getGuild();

      expect(result).toStrictEqual({
        shouldWelcomeNewMembers: true,
        soniaPermanentGuildInviteUrl: `dummy-sonia-permanent-guild-invite-url`
      } as IDiscordGuildConfig);
    });
  });

  describe(`shouldWelcomeNewMembers()`, (): void => {
    beforeEach((): void => {
      DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers = true;
    });

    it(`should return the Discord guild config welcome new members state`, (): void => {
      expect.assertions(1);

      const result = service.shouldWelcomeNewMembers();

      expect(result).toStrictEqual(true);
    });
  });

  describe(`updateWelcomeNewMembersState()`, (): void => {
    let shouldWelcomeNewMembers: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      shouldWelcomeNewMembers = true;
      DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers = false;

      configServiceGetUpdatedBooleanSpy = jest.spyOn(configService, `getUpdatedBoolean`).mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateWelcomeNewMembersState(shouldWelcomeNewMembers);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigService`,
        newValue: true,
        oldValue: false,
        valueName: `welcome new members state`
      } as IConfigUpdateBoolean);
    });

    it(`should update the Discord guild config welcome new members state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateWelcomeNewMembersState(shouldWelcomeNewMembers);

      expect(DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers).toStrictEqual(true);
    });
  });

  describe(`getSoniaPermanentGuildInviteUrl()`, (): void => {
    beforeEach((): void => {
      DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    it(`should return the Discord guild config sonia permanent guild invite url`, (): void => {
      expect.assertions(1);

      const result = service.getSoniaPermanentGuildInviteUrl();

      expect(result).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });
  });

  describe(`updateSoniaPermanentGuildInviteUrl()`, (): void => {
    let soniaPermanentGuildInviteUrl: string;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
      DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl = `sonia-permanent-guild-invite-url`;

      configServiceGetUpdatedBooleanSpy = jest.spyOn(configService, `getUpdatedString`).mockReturnValue(`dummy-sonia-permanent-guild-invite-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigService`,
        newValue: `dummy-sonia-permanent-guild-invite-url`,
        oldValue: `sonia-permanent-guild-invite-url`,
        valueName: `Sonia permanent guild invite url`
      } as IConfigUpdateString);
    });

    it(`should update the Discord guild config sonia permanent guild invite url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl);

      expect(DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });
  });
});
