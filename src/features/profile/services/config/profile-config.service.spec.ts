import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";
import { ProfileConfigService } from "./profile-config.service";

describe(`ProfileConfigService`, (): void => {
  let service: ProfileConfigService;
  let profileConfigCoreService: ProfileConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    profileConfigCoreService = ProfileConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a ProfileConfig service`, (): void => {
      expect.assertions(1);

      service = ProfileConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(ProfileConfigService));
    });

    it(`should return the created ProfileConfig service`, (): void => {
      expect.assertions(1);

      const result = ProfileConfigService.getInstance();

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

    it(`should notify the ProfileConfig service creation`, (): void => {
      expect.assertions(2);

      service = new ProfileConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.PROFILE_CONFIG_SERVICE
      );
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = ProfileConfigService.getInstance();
      profileConfigCoreService.discordId = `dummy-discord-id`;
      profileConfigCoreService.nickname = `dummy-nickname`;
    });

    it(`should return the profile config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        discordId: `dummy-discord-id`,
        nickname: `dummy-nickname`,
      } as IProfileConfig);
    });
  });

  describe(`getDiscordId()`, (): void => {
    beforeEach((): void => {
      service = ProfileConfigService.getInstance();
      profileConfigCoreService.discordId = `dummy-discord-id`;
    });

    it(`should return the Discord id`, (): void => {
      expect.assertions(1);

      const result = service.getDiscordId();

      expect(result).toStrictEqual(`dummy-discord-id`);
    });
  });

  describe(`getNickname()`, (): void => {
    beforeEach((): void => {
      service = ProfileConfigService.getInstance();
      profileConfigCoreService.nickname = `dummy-nickname`;
    });

    it(`should return the nickname`, (): void => {
      expect.assertions(1);

      const result = service.getNickname();

      expect(result).toStrictEqual(`dummy-nickname`);
    });
  });
});
