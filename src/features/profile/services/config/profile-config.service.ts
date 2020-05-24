import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";

export class ProfileConfigService extends AbstractService {
  private static _instance: ProfileConfigService;

  public static getInstance(): ProfileConfigService {
    if (_.isNil(ProfileConfigService._instance)) {
      ProfileConfigService._instance = new ProfileConfigService();
    }

    return ProfileConfigService._instance;
  }

  private readonly _profileConfigCoreService: ProfileConfigCoreService = ProfileConfigCoreService.getInstance();

  public constructor() {
    super(ServiceNameEnum.PROFILE_CONFIG_SERVICE);
  }

  public getConfig(): IProfileConfig {
    return {
      discordId: this.getDiscordId(),
      nickname: this.getNickname(),
    };
  }

  public getDiscordId(): string | null {
    return this._profileConfigCoreService.discordId;
  }

  public getNickname(): string | null {
    return this._profileConfigCoreService.nickname;
  }
}
