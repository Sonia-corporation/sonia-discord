import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { PartialNested } from "../../../../../types/partial-nested";
import { IConfigUpdateBoolean } from "../../../../config/interfaces/config-update-boolean";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config.service";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core.service";
import { DiscordGuildConfigMutatorService } from "./discord-guild-config-mutator.service";
import { DiscordGuildConfigService } from "./discord-guild-config.service";

jest.mock(`../../../../time/services/time.service`);
jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordGuildConfigMutatorService`, (): void => {
  let service: DiscordGuildConfigMutatorService;
  let configService: ConfigService;
  let discordGuildConfigCoreService: DiscordGuildConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    beforeEach((): void => {
      config = {
        guild: {
          shouldSendCookiesOnCreate: true,
          shouldSendIlEstMidiMessage: true,
          shouldWelcomeNewMembers: true,
          soniaGuildId: `dummy-sonia-guild-id`,
          soniaPermanentGuildInviteUrl: `dummy-sonia-permanent-guild-invite-url`,
        },
      };
    });

    it(`should create a DiscordGuildConfigMutator service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(
        expect.any(DiscordGuildConfigMutatorService)
      );
    });

    it(`should return the created DiscordGuildConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the AppConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current send cookies on create state`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.shouldSendCookiesOnCreate = true;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.shouldSendCookiesOnCreate
        ).toStrictEqual(true);
      });

      it(`should not update the current send il est midi message state`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.shouldSendIlEstMidiMessage = true;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.shouldSendIlEstMidiMessage
        ).toStrictEqual(true);
      });

      it(`should not update the current welcome new members state`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.shouldWelcomeNewMembers = true;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.shouldWelcomeNewMembers
        ).toStrictEqual(true);
      });

      it(`should not update the current sonia guild id`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.soniaGuildId = `soniaGuildId`;

        service = new DiscordGuildConfigMutatorService(config);

        expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
          `soniaGuildId`
        );
      });

      it(`should not update the current sonia permanent guild invite url`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `soniaPermanentGuildInviteUrl`;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
        ).toStrictEqual(`soniaPermanentGuildInviteUrl`);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          guild: {
            shouldSendCookiesOnCreate: true,
            shouldSendIlEstMidiMessage: true,
            shouldWelcomeNewMembers: true,
            soniaGuildId: `dummy-sonia-guild-id`,
            soniaPermanentGuildInviteUrl: `dummy-sonia-permanent-guild-invite-url`,
          },
        };
      });

      it(`should override the send cookies on create state`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.shouldSendCookiesOnCreate = false;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.shouldSendCookiesOnCreate
        ).toStrictEqual(true);
      });

      it(`should override the send il est midi message state`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.shouldSendIlEstMidiMessage = false;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.shouldSendIlEstMidiMessage
        ).toStrictEqual(true);
      });

      it(`should override the welcome new members state`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.shouldWelcomeNewMembers = false;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.shouldWelcomeNewMembers
        ).toStrictEqual(true);
      });

      it(`should override the send sonia guild id`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.soniaGuildId = `soniaGuildId`;

        service = new DiscordGuildConfigMutatorService(config);

        expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
          `dummy-sonia-guild-id`
        );
      });

      it(`should override the sonia permanent guild invite url`, (): void => {
        expect.assertions(1);
        discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `soniaPermanentGuildInviteUrl`;

        service = new DiscordGuildConfigMutatorService(config);

        expect(
          discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
        ).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let discordGuildConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let discordGuildConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      discordGuildConfigCoreServiceGetInstanceSpy = jest.spyOn(
        DiscordGuildConfigCoreService,
        `getInstance`
      );
      discordGuildConfigServiceGetInstanceSpy = jest.spyOn(
        DiscordGuildConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordGuildConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordGuildConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(
        1
      );
      expect(
        discordGuildConfigCoreServiceGetInstanceSpy
      ).toHaveBeenCalledWith();
    });

    it(`should create the DiscordGuildConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordGuildConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
      discordGuildConfigCoreService.shouldSendCookiesOnCreate = true;
      discordGuildConfigCoreService.shouldSendIlEstMidiMessage = true;
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
      discordGuildConfigCoreService.soniaGuildId = `dummy-sonia-guild-id`;
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(5);

      service.updateConfig();

      expect(
        discordGuildConfigCoreService.shouldSendCookiesOnCreate
      ).toStrictEqual(true);
      expect(
        discordGuildConfigCoreService.shouldSendIlEstMidiMessage
      ).toStrictEqual(true);
      expect(
        discordGuildConfigCoreService.shouldWelcomeNewMembers
      ).toStrictEqual(true);
      expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
        `dummy-sonia-guild-id`
      );
      expect(
        discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
      ).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });

    it(`should not log about the config update`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(loggerLogSpy).not.toHaveBeenCalled();
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(5);

        service.updateConfig(config);

        expect(
          discordGuildConfigCoreService.shouldSendCookiesOnCreate
        ).toStrictEqual(true);
        expect(
          discordGuildConfigCoreService.shouldSendIlEstMidiMessage
        ).toStrictEqual(true);
        expect(
          discordGuildConfigCoreService.shouldWelcomeNewMembers
        ).toStrictEqual(true);
        expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
          `dummy-sonia-guild-id`
        );
        expect(
          discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
        ).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains a guild send cookies on create state`, (): void => {
      beforeEach((): void => {
        config = {
          guild: {
            shouldSendCookiesOnCreate: false,
          },
        };
      });

      it(`should update the config send cookie on create state`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(
          discordGuildConfigCoreService.shouldSendCookiesOnCreate
        ).toStrictEqual(false);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordGuildConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a guild send il est midi message state`, (): void => {
      beforeEach((): void => {
        config = {
          guild: {
            shouldSendIlEstMidiMessage: false,
          },
        };
      });

      it(`should update the config send il est midi message state`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(
          discordGuildConfigCoreService.shouldSendIlEstMidiMessage
        ).toStrictEqual(false);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordGuildConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a guild welcome new members state`, (): void => {
      beforeEach((): void => {
        config = {
          guild: {
            shouldWelcomeNewMembers: false,
          },
        };
      });

      it(`should update the config welcome new members state`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(
          discordGuildConfigCoreService.shouldWelcomeNewMembers
        ).toStrictEqual(false);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordGuildConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a guild Sonia guild id`, (): void => {
      beforeEach((): void => {
        config = {
          guild: {
            soniaGuildId: `sonia-guild-id`,
          },
        };
      });

      it(`should update the config Sonia guild id`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
          `sonia-guild-id`
        );
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordGuildConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a guild Sonia permanent guild invite url`, (): void => {
      beforeEach((): void => {
        config = {
          guild: {
            soniaPermanentGuildInviteUrl: `sonia-permanent-guild-invite-url`,
          },
        };
      });

      it(`should update the config Sonia permanent guild invite url`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(
          discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
        ).toStrictEqual(`sonia-permanent-guild-invite-url`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordGuildConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateGuild()`, (): void => {
    let config: PartialNested<IDiscordGuildConfig> | undefined;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
      discordGuildConfigCoreService.shouldSendCookiesOnCreate = true;
      discordGuildConfigCoreService.shouldSendIlEstMidiMessage = true;
      discordGuildConfigCoreService.shouldWelcomeNewMembers = true;
      discordGuildConfigCoreService.soniaGuildId = `dummy-sonia-guild-id`;
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(5);

        service.updateGuild(config);

        expect(
          discordGuildConfigCoreService.shouldSendCookiesOnCreate
        ).toStrictEqual(true);
        expect(
          discordGuildConfigCoreService.shouldSendIlEstMidiMessage
        ).toStrictEqual(true);
        expect(
          discordGuildConfigCoreService.shouldWelcomeNewMembers
        ).toStrictEqual(true);
        expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
          `dummy-sonia-guild-id`
        );
        expect(
          discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
        ).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
      });
    });

    describe(`when the given config contains a send cookies on create state`, (): void => {
      beforeEach((): void => {
        config = {
          shouldSendCookiesOnCreate: false,
        };
      });

      it(`should update the config send cookies on create state`, (): void => {
        expect.assertions(1);

        service.updateGuild(config);

        expect(
          discordGuildConfigCoreService.shouldSendCookiesOnCreate
        ).toStrictEqual(false);
      });
    });

    describe(`when the given config contains a send il est midi message state`, (): void => {
      beforeEach((): void => {
        config = {
          shouldSendIlEstMidiMessage: false,
        };
      });

      it(`should update the config send il est midi message state`, (): void => {
        expect.assertions(1);

        service.updateGuild(config);

        expect(
          discordGuildConfigCoreService.shouldSendIlEstMidiMessage
        ).toStrictEqual(false);
      });
    });

    describe(`when the given config contains a welcome new members state`, (): void => {
      beforeEach((): void => {
        config = {
          shouldWelcomeNewMembers: false,
        };
      });

      it(`should update the config welcome new members state`, (): void => {
        expect.assertions(1);

        service.updateGuild(config);

        expect(
          discordGuildConfigCoreService.shouldWelcomeNewMembers
        ).toStrictEqual(false);
      });
    });

    describe(`when the given config contains a Sonia guild id`, (): void => {
      beforeEach((): void => {
        config = {
          soniaGuildId: `sonia-guild-id`,
        };
      });

      it(`should update the config Sonia guild id`, (): void => {
        expect.assertions(1);

        service.updateGuild(config);

        expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
          `sonia-guild-id`
        );
      });
    });

    describe(`when the given config contains a Sonia permanent guild invite url`, (): void => {
      beforeEach((): void => {
        config = {
          soniaPermanentGuildInviteUrl: `sonia-permanent-guild-invite-url`,
        };
      });

      it(`should update the config Sonia permanent guild invite url`, (): void => {
        expect.assertions(1);

        service.updateGuild(config);

        expect(
          discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
        ).toStrictEqual(`sonia-permanent-guild-invite-url`);
      });
    });
  });

  describe(`updateSendCookiesOnCreateState()`, (): void => {
    let shouldSendCookiesOnCreate: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
      shouldSendCookiesOnCreate = true;
      discordGuildConfigCoreService.shouldSendCookiesOnCreate = false;

      configServiceGetUpdatedBooleanSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateSendCookiesOnCreateState(shouldSendCookiesOnCreate);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigMutatorService`,
        newValue: true,
        oldValue: false,
        valueName: `send cookies on create state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the Discord guild config send cookies on create state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateSendCookiesOnCreateState(shouldSendCookiesOnCreate);

      expect(
        discordGuildConfigCoreService.shouldSendCookiesOnCreate
      ).toStrictEqual(true);
    });
  });

  describe(`updateSendIlEstMidiMessageState()`, (): void => {
    let shouldSendIlEstMidiMessage: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
      shouldSendIlEstMidiMessage = true;
      discordGuildConfigCoreService.shouldSendIlEstMidiMessage = false;

      configServiceGetUpdatedBooleanSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateSendIlEstMidiMessageState(shouldSendIlEstMidiMessage);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigMutatorService`,
        newValue: true,
        oldValue: false,
        valueName: `send il est midi message state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the Discord guild config send il est midi message state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateSendIlEstMidiMessageState(shouldSendIlEstMidiMessage);

      expect(
        discordGuildConfigCoreService.shouldSendIlEstMidiMessage
      ).toStrictEqual(true);
    });
  });

  describe(`updateWelcomeNewMembersState()`, (): void => {
    let shouldWelcomeNewMembers: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
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

  describe(`updateSoniaGuildId()`, (): void => {
    let soniaGuildId: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
      soniaGuildId = `dummy-sonia-guild-id`;
      discordGuildConfigCoreService.soniaGuildId = `sonia-guild-id`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-sonia-guild-id`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateSoniaGuildId(soniaGuildId);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigMutatorService`,
        newValue: `dummy-sonia-guild-id`,
        oldValue: `sonia-guild-id`,
        valueName: `Sonia guild id`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord guild config Sonia guild id with the updated string`, (): void => {
      expect.assertions(1);

      service.updateSoniaGuildId(soniaGuildId);

      expect(discordGuildConfigCoreService.soniaGuildId).toStrictEqual(
        `dummy-sonia-guild-id`
      );
    });
  });

  describe(`updateSoniaPermanentGuildInviteUrl()`, (): void => {
    let soniaPermanentGuildInviteUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildConfigMutatorService.getInstance();
      soniaPermanentGuildInviteUrl = `dummy-sonia-permanent-guild-invite-url`;
      discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = `sonia-permanent-guild-invite-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-sonia-permanent-guild-invite-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordGuildConfigMutatorService`,
        newValue: `dummy-sonia-permanent-guild-invite-url`,
        oldValue: `sonia-permanent-guild-invite-url`,
        valueName: `Sonia permanent guild invite url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord guild config Sonia permanent guild invite url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl);

      expect(
        discordGuildConfigCoreService.soniaPermanentGuildInviteUrl
      ).toStrictEqual(`dummy-sonia-permanent-guild-invite-url`);
    });
  });
});
