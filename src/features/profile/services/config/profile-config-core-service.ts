import _ from "lodash";
import { IProfileConfig } from "../../interfaces/profile-config";

export class ProfileConfigCoreService implements IProfileConfig {
  private static _instance: ProfileConfigCoreService;

  public static getInstance(): ProfileConfigCoreService {
    if (_.isNil(ProfileConfigCoreService._instance)) {
      ProfileConfigCoreService._instance = new ProfileConfigCoreService();
    }

    return ProfileConfigCoreService._instance;
  }

  public nickname: string | null = null;
}
