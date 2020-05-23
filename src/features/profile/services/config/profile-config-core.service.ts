import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { IProfileConfig } from "../../interfaces/profile-config";

export class ProfileConfigCoreService extends AbstractService
  implements IProfileConfig {
  private static _instance: ProfileConfigCoreService;

  public static getInstance(): ProfileConfigCoreService {
    if (_.isNil(ProfileConfigCoreService._instance)) {
      ProfileConfigCoreService._instance = new ProfileConfigCoreService();
    }

    return ProfileConfigCoreService._instance;
  }

  public discordId: string | null = null;
  public nickname: string | null = null;

  public constructor() {
    super(ServiceNameEnum.PROFILE_CONFIG_CORE_SERVICE);
  }
}
