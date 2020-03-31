import { ProfileService } from "./profile-service";
import { PROFILE_CONFIG } from "../constants/profile-config";

jest.mock(`../../config/services/config-service`);

describe(`ProfileService`, (): void => {
  let service: ProfileService;

  beforeEach((): void => {
    service = ProfileService.getInstance();
  });

  describe(`getProfileNicknameDev()`, (): void => {
    beforeEach((): void => {
      PROFILE_CONFIG.nickname = `toto`;
    });

    it(`should get PROFILE_CONFIG nickname string`, (): void => {
      expect.assertions(1);
      const result = service.getProfileNicknameDev();
      expect(result).toStrictEqual(`toto`);
    });
  });
});
