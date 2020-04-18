import _ from "lodash";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";

export class ProfileConfigService {
  private static _instance: ProfileConfigService;

  public static getInstance(): ProfileConfigService {
    if (_.isNil(ProfileConfigService._instance)) {
      ProfileConfigService._instance = new ProfileConfigService();
    }

    return ProfileConfigService._instance;
  }

  private readonly _profileConfigCoreService = ProfileConfigCoreService.getInstance();

  public getConfig(): IProfileConfig {
    return {
      nickname: this.getNickname(),
    };
  }

  public getNickname(): string | null {
    return this._profileConfigCoreService.nickname;
  }
}
