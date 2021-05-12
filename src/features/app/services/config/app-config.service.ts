import { AppConfigCoreService } from './app-config-core.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../enums/app-config-release-type.enum';
import { IAppConfig } from '../../interfaces/app-config';
import _ from 'lodash';

export class AppConfigService extends AbstractService {
  private static _instance: AppConfigService;

  public static getInstance(): AppConfigService {
    if (_.isNil(AppConfigService._instance)) {
      AppConfigService._instance = new AppConfigService();
    }

    return AppConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.APP_CONFIG_SERVICE);
  }

  public getConfig(): IAppConfig {
    return {
      firstReleaseDate: this.getFirstReleaseDate(),
      initializationDate: this.getInitializationDate(),
      isProduction: this.isProduction(),
      releaseDate: this.getReleaseDate(),
      releaseNotes: this.getReleaseNotes(),
      releaseType: this.getReleaseType(),
      totalReleaseCount: this.getTotalReleaseCount(),
      version: this.getVersion(),
    };
  }

  public getFirstReleaseDate(): string {
    return AppConfigCoreService.getInstance().firstReleaseDate;
  }

  public getInitializationDate(): string {
    return AppConfigCoreService.getInstance().initializationDate;
  }

  public isProduction(): boolean {
    return AppConfigCoreService.getInstance().isProduction;
  }

  public getReleaseDate(): string {
    return AppConfigCoreService.getInstance().releaseDate;
  }

  public getReleaseNotes(): string {
    return AppConfigCoreService.getInstance().releaseNotes;
  }

  public getReleaseType(): AppConfigReleaseTypeEnum {
    return AppConfigCoreService.getInstance().releaseType;
  }

  public getTotalReleaseCount(): number {
    return AppConfigCoreService.getInstance().totalReleaseCount;
  }

  public getVersion(): string {
    return AppConfigCoreService.getInstance().version;
  }
}
