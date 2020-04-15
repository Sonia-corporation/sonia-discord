import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";
import { ProfileConfigService } from "./profile-config.service";

describe(`ProfileConfigService`, (): void => {
  let service: ProfileConfigService;
  let profileConfigCoreService: ProfileConfigCoreService;

  beforeEach((): void => {
    service = ProfileConfigService.getInstance();
    profileConfigCoreService = ProfileConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      profileConfigCoreService.nickname = `dummy-nickname`;
    });

    it(`should return the profile config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        nickname: `dummy-nickname`,
      } as IProfileConfig);
    });
  });

  describe(`getNickname()`, (): void => {
    beforeEach((): void => {
      profileConfigCoreService.nickname = `dummy-nickname`;
    });

    it(`should return the nickname`, (): void => {
      expect.assertions(1);

      const result = service.getNickname();

      expect(result).toStrictEqual(`dummy-nickname`);
    });
  });
});
