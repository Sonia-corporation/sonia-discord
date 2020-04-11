import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core-service";
import { ProfileConfigMutatorService } from "./profile-config-mutator-service";

jest.mock(`../../../config/services/config-service`);

describe(`ProfileConfigMutatorService`, (): void => {
  let service: ProfileConfigMutatorService;
  let configService: ConfigService;
  let profileConfigCoreService: ProfileConfigCoreService;

  beforeEach((): void => {
    service = ProfileConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    profileConfigCoreService = ProfileConfigCoreService.getInstance();
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IProfileConfig> | undefined;

    beforeEach((): void => {
      profileConfigCoreService.nickname = `dummy-nickname`;
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(profileConfigCoreService.nickname).toStrictEqual(
          `dummy-nickname`
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
    });
  });

  describe(`updateNickname()`, (): void => {
    let nickname: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
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
