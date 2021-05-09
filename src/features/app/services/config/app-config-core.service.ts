import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../enums/app-config-release-type.enum';
import { IAppConfig } from '../../interfaces/app-config';
import _ from 'lodash';

const INITIAL_TOTAL_RELEASE_COUNT = 0;

export class AppConfigCoreService extends AbstractService implements IAppConfig {
  private static _instance: AppConfigCoreService;

  public static getInstance(): AppConfigCoreService {
    if (_.isNil(AppConfigCoreService._instance)) {
      AppConfigCoreService._instance = new AppConfigCoreService();
    }

    return AppConfigCoreService._instance;
  }

  public firstReleaseDate = `2020-03-24T00:00:00.000Z`;
  public initializationDate = `unknown`;
  public isProduction = false;
  public releaseDate = `unknown`;
  public releaseNotes = ``;
  public releaseType = AppConfigReleaseTypeEnum.MIXED;
  public totalReleaseCount = INITIAL_TOTAL_RELEASE_COUNT;
  public version = `unknown`;

  public constructor() {
    super(ServiceNameEnum.APP_CONFIG_CORE_SERVICE);
  }
}
