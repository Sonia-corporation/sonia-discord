import _ from "lodash";
import { PROFILE_CONFIG } from "../constants/profile-config";

export class ProfileService {
  private static _instance: ProfileService;

  public static getInstance(): ProfileService {
    if (_.isNil(ProfileService._instance)) {
      ProfileService._instance = new ProfileService();
    }

    return ProfileService._instance;
  }

  public getNickname(): string {
    return PROFILE_CONFIG.nickname;
  }
}
