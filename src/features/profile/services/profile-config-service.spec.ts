import { ProfileConfigService } from "./profile-config-service";
import { ConfigService } from "../../config/services/config-service";
import { PROFILE_CONFIG } from "../constants/profile-config";
import { IConfigUpdateString } from "../../config/interfaces/config-update-string";
import { IProfileConfig } from "../interfaces/profile-config";

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

  describe(`updateProfile()`, (): void => {
    let nickname: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      nickname = `toto-nickname`;
      PROFILE_CONFIG.nickname = `toto`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`toto`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateNickname(nickname);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `ProfileConfigService`,
        newValue: `toto-nickname`,
        oldValue: `toto`,
        valueName: `nickname`,
      } as IConfigUpdateString);
    });
  });

  describe(`getNickname()`, (): void => {
    beforeEach((): void => {
      PROFILE_CONFIG.nickname = `toto`;
    });

    it(`should get PROFILE_CONFIG nickname string`, (): void => {
      expect.assertions(1);

      const result = service.getNickname();

      expect(result).toStrictEqual(`toto`);
    });
  });

  describe(`getNickname() default value`, (): void => {
    beforeEach((): void => {
      PROFILE_CONFIG.nickname = ``;
    });

    it(`should get PROFILE_CONFIG nickname default value`, (): void => {
      expect.assertions(1);

      const result = service.getNickname();

      expect(result).toStrictEqual(``);
    });
  });
});
