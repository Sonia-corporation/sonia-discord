import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";
import { ProfileConfigService } from "./profile-config.service";

export class ProfileConfigMutatorService extends AbstractConfigService<
  IProfileConfig
> {
  private static _instance: ProfileConfigMutatorService;

  public static getInstance(
    config?: Readonly<Partial<IProfileConfig>>
  ): ProfileConfigMutatorService {
    if (_.isNil(ProfileConfigMutatorService._instance)) {
      ProfileConfigMutatorService._instance = new ProfileConfigMutatorService(
        config
      );
    }

    return ProfileConfigMutatorService._instance;
  }

  private readonly _profileConfigCoreService: ProfileConfigCoreService = ProfileConfigCoreService.getInstance();
  private readonly _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();

  protected constructor(config?: Readonly<Partial<IProfileConfig>>) {
    super(`ProfileConfigMutatorService`, config);
  }

  public updateConfig(config?: Readonly<Partial<IProfileConfig>>): void {
    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateNickname(config.nickname);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateNickname(nickname?: Readonly<string | null>): void {
    this._profileConfigCoreService.nickname = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: nickname,
        oldValue: this._profileConfigService.getNickname(),
        valueName: `nickname`,
      }
    );
  }
}
