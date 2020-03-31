import _ from "lodash";
import { AbstractConfigService } from "../../../classes/abstract-config-service";
import { IEnvironmentProfile } from "../../../environment/interfaces/environment-profile";
import { PROFILE_CONFIG } from "../constants/profile-config";

export class ProfileConfigService extends AbstractConfigService<
  IEnvironmentProfile
> {
  private static _instance: ProfileConfigService;

  public static getInstance(
    config?: Readonly<Partial<IEnvironmentProfile>>
  ): ProfileConfigService {
    if (_.isNil(ProfileConfigService._instance)) {
      ProfileConfigService._instance = new ProfileConfigService(config);
    }

    return ProfileConfigService._instance;
  }

  protected readonly _className = `ProfileConfigService`;

  protected constructor(config?: Readonly<Partial<IEnvironmentProfile>>) {
    super(config);
  }

  public updateConfig(config?: Readonly<Partial<IEnvironmentProfile>>): void {
    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateProfile(config.nickname);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateProfile(nickname?: Readonly<string>): void {
    PROFILE_CONFIG.nickname = this._configService.getUpdatedString({
      context: this._className,
      newValue: nickname,
      oldValue: PROFILE_CONFIG.nickname,
      valueName: `nickname`,
    });
  }
}
