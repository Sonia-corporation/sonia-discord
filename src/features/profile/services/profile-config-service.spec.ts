import { ProfileConfigService } from "./profile-config-service";
import { ConfigService } from "../../config/services/config-service";
import { PROFILE_CONFIG } from "../constants/profile-config";
import { IConfigUpdateString } from "../../config/interfaces/config-update-string";

jest.mock(`../../config/services/config-service`);

describe(`ProfileConfigService`, (): void => {
  let service: ProfileConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = ProfileConfigService.getInstance();
    configService = ConfigService.getInstance();
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

      service.updateProfile(nickname);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `ProfileConfigService`,
        newValue: `toto-nickname`,
        oldValue: `toto`,
        valueName: `nickname`,
      } as IConfigUpdateString);
    });
  });
});
