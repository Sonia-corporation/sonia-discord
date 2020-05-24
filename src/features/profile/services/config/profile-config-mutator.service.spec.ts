import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config.service";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";
import { ProfileConfigMutatorService } from "./profile-config-mutator.service";
import { ProfileConfigService } from "./profile-config.service";

jest.mock(`../../../time/services/time.service`);
jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`ProfileConfigMutatorService`, (): void => {
  let service: ProfileConfigMutatorService;
  let configService: ConfigService;
  let profileConfigCoreService: ProfileConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    profileConfigCoreService = ProfileConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IProfileConfig> | undefined;

    beforeEach((): void => {
      config = {
        nickname: `dummy-nickname`,
      };
    });

    it(`should create a ProfileConfigMutator service`, (): void => {
      expect.assertions(1);

      service = ProfileConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(ProfileConfigMutatorService));
    });

    it(`should return the created ProfileConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = ProfileConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IProfileConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the ProfileConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new ProfileConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.PROFILE_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current Discord id`, (): void => {
        expect.assertions(1);
        profileConfigCoreService.discordId = `discordId`;

        service = new ProfileConfigMutatorService(config);

        expect(profileConfigCoreService.discordId).toStrictEqual(`discordId`);
      });

      it(`should not update the current nickname`, (): void => {
        expect.assertions(1);
        profileConfigCoreService.nickname = `nickname`;

        service = new ProfileConfigMutatorService(config);

        expect(profileConfigCoreService.nickname).toStrictEqual(`nickname`);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          discordId: `dummy-discord-id`,
          nickname: `dummy-nickname`,
        };
      });

      it(`should override the Discord id`, (): void => {
        expect.assertions(1);
        profileConfigCoreService.discordId = `discordId`;

        service = new ProfileConfigMutatorService(config);

        expect(profileConfigCoreService.discordId).toStrictEqual(
          `dummy-discord-id`
        );
      });

      it(`should override the nickname`, (): void => {
        expect.assertions(1);
        profileConfigCoreService.nickname = `nickname`;

        service = new ProfileConfigMutatorService(config);

        expect(profileConfigCoreService.nickname).toStrictEqual(
          `dummy-nickname`
        );
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let profileConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let profileConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ProfileConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      profileConfigCoreServiceGetInstanceSpy = jest.spyOn(
        ProfileConfigCoreService,
        `getInstance`
      );
      profileConfigServiceGetInstanceSpy = jest.spyOn(
        ProfileConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the ProfileConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(profileConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(profileConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the ProfileConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(profileConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(profileConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IProfileConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ProfileConfigMutatorService.getInstance();
      profileConfigCoreService.discordId = `dummy-discord-id`;
      profileConfigCoreService.nickname = `dummy-nickname`;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(2);

      service.updateConfig();

      expect(profileConfigCoreService.discordId).toStrictEqual(
        `dummy-discord-id`
      );
      expect(profileConfigCoreService.nickname).toStrictEqual(`dummy-nickname`);
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
        expect.assertions(2);

        service.updateConfig(config);

        expect(profileConfigCoreService.discordId).toStrictEqual(
          `dummy-discord-id`
        );
        expect(profileConfigCoreService.nickname).toStrictEqual(
          `dummy-nickname`
        );
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains a Discord id`, (): void => {
      beforeEach((): void => {
        config = {
          discordId: `discord-id`,
        };
      });

      it(`should update the config Discord id`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(profileConfigCoreService.discordId).toStrictEqual(`discord-id`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[ProfileConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a nickname`, (): void => {
      beforeEach((): void => {
        config = {
          nickname: `nickname`,
        };
      });

      it(`should update the config nickname`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(profileConfigCoreService.nickname).toStrictEqual(`nickname`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[ProfileConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateDiscordId()`, (): void => {
    let discordId: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ProfileConfigMutatorService.getInstance();
      discordId = `discord-id`;
      profileConfigCoreService.discordId = `dummy-discord-id`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`discord-id`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateDiscordId(discordId);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `ProfileConfigMutatorService`,
        newValue: `discord-id`,
        oldValue: `dummy-discord-id`,
        valueName: `discord id`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord id with the updated string`, (): void => {
      expect.assertions(1);

      service.updateDiscordId(discordId);

      expect(profileConfigCoreService.discordId).toStrictEqual(`discord-id`);
    });
  });

  describe(`updateNickname()`, (): void => {
    let nickname: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = ProfileConfigMutatorService.getInstance();
      nickname = `nickname`;
      profileConfigCoreService.nickname = `dummy-nickname`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`nickname`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateNickname(nickname);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `ProfileConfigMutatorService`,
        newValue: `nickname`,
        oldValue: `dummy-nickname`,
        valueName: `nickname`,
      } as IConfigUpdateString);
    });

    it(`should update the nickname with the updated string`, (): void => {
      expect.assertions(1);

      service.updateNickname(nickname);

      expect(profileConfigCoreService.nickname).toStrictEqual(`nickname`);
    });
  });
});
