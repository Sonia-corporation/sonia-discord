import { IConfigUpdateString } from "../../config/interfaces/config-update-string";
import { ConfigService } from "../../config/services/config-service";
import { PROFILE_CONFIG } from "../constants/profile-config";
import { IProfileConfig } from "../interfaces/profile-config";
import { ProfileConfigService } from "./profile-config-service";

jest.mock(`../../config/services/config-service`);

describe(`ProfileConfigService`, (): void => {
  let service: ProfileConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = ProfileConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      PROFILE_CONFIG.nickname = `evil`;
    });

    it(`should return the profile config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        nickname: `evil`,
      } as IProfileConfig);
    });
  });

  describe(`getNickname()`, (): void => {
    beforeEach((): void => {
      PROFILE_CONFIG.nickname = `dummy-profil-nickname`;
    });

    it(`should get the profile config nickname`, (): void => {
      expect.assertions(1);

      const result = service.getNickname();

      expect(result).toStrictEqual(`dummy-profil-nickname`);
    });
  });

  describe(`updateProfile()`, (): void => {
    let nickname: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      nickname = `dummy-nickname`;
      PROFILE_CONFIG.nickname = `dummy-profil-nickname`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(nickname);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateNickname(nickname);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `ProfileConfigService`,
        newValue: `dummy-nickname`,
        oldValue: `dummy-profil-nickname`,
        valueName: `nickname`,
      } as IConfigUpdateString);
    });

    it(`should update the profile config nickname with the updated nickname`, (): void => {
      expect.assertions(1);

      service.updateNickname(nickname);

      expect(PROFILE_CONFIG.nickname).toStrictEqual(`dummy-nickname`);
    });
  });
});
