import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../classes/enums/service-name.enum";
import { IAppConfig } from "../../interfaces/app-config";

export class AppConfigCoreService extends AbstractService
  implements IAppConfig {
  private static _instance: AppConfigCoreService;

  public static getInstance(): AppConfigCoreService {
    if (_.isNil(AppConfigCoreService._instance)) {
      AppConfigCoreService._instance = new AppConfigCoreService();
    }

    return AppConfigCoreService._instance;
  }

  public initializationDate = `unknown`;
  public isProduction = false;
  public releaseDate = `unknown`;
  public releaseNotes = ``;
  public totalReleaseCount = 0;
  public version = `unknown`;

  protected constructor() {
    super(ServiceNameEnum.APP_CONFIG_CORE_SERVICE);
  }
}
