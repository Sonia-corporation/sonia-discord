import { IConfigUpdateBoolean } from "../../../../config/interfaces/config-update-boolean";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config-service";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core-service";
import { DiscordGuildConfigMutatorService } from "./discord-guild-config-mutator-service";

jest.mock(`../../../../config/services/config-service`);

describe(`DiscordGuildConfigMutatorService`, (): void => {
  let service: DiscordGuildConfigMutatorService;
  let configService: ConfigService;
  let discordGuildConfigCoreService: DiscordGuildConfigCoreService;

  beforeEach((): void => {
    service = DiscordGuildConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
  });

  describe(`updateWelcomeNewMembersState()`, (): void => {
    let shouldWelcomeNewMembers: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      shouldWelcomeNewMembers = true;
      discordGuildConfigCoreService.shouldWelcomeNewMembers = false;

      configServiceGetUpdatedBooleanSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateWelcomeNewMembersState(shouldWelcomeNewMembers);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigMutatorService`,
        newValue: true,
        oldValue: false,
        valueName: `welcome new members state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the Discord guild config welcome new members state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateWelcomeNewMembersState(shouldWelcomeNewMembers);

      expect(
        discordGuildConfigCoreService.shouldWelcomeNewMembers
      ).toStrictEqual(true);
    });
  });

  describe(`updateSoniaPermanentGuildInviteUrl()`, (): void => {
    let soniaPermanentGuildInviteUrl: string;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `sonia-permanent-guild-invite-url`;

      configServiceGetUpdatedBooleanSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-sonia-permanent-guild-invite-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigMutatorService`,
        newValue: `dummy-sonia-permanent-guild-invite-url`,
        oldValue: `sonia-permanent-guild-invite-url`,
        valueName: `Sonia permanent guild invite url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord guild config sonia permanent guild invite url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl);

      expect(
        discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
      ).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });
  });
});
