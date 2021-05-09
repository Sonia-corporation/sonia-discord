import { AppConfigCoreService } from './app-config-core.service';
import { AppConfigService } from './app-config.service';
import { AbstractConfigService } from '../../../../classes/services/abstract-config.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../types/partial-nested';
import { ConfigService } from '../../../config/services/config.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { isNodeProduction } from '../../../node/functions/is-node-production';
import { TimeService } from '../../../time/services/time.service';
import { AppConfigValueNameEnum } from '../../enums/app-config-value-name.enum';
import { IAppConfig } from '../../interfaces/app-config';
import { IAppUpdatableConfig } from '../../types/app-updatable-config';
import { ReleaseTypeService } from '../release-type.service';
import _ from 'lodash';

export class AppConfigMutatorService extends AbstractConfigService<IAppConfig> {
  private static _instance: AppConfigMutatorService;

  public static getInstance(config?: Readonly<IPartialNested<IAppUpdatableConfig>>): AppConfigMutatorService {
    if (_.isNil(AppConfigMutatorService._instance)) {
      AppConfigMutatorService._instance = new AppConfigMutatorService(config);
    }

    return AppConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IAppConfig>>) {
    super(ServiceNameEnum.APP_CONFIG_MUTATOR_SERVICE, config);
  }

  public init(): AppConfigMutatorService {
    this._setProductionState();
    this._setBuildDate();

    return this;
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    TimeService.getInstance();
    AppConfigCoreService.getInstance();
    AppConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IAppUpdatableConfig>>): void {
    if (!_.isNil(config)) {
      this.updateFirstReleaseDate(config.firstReleaseDate);
      this.updateInitializationDate(config.initializationDate);
      this.updateProductionState(config.isProduction);
      this.updateReleaseDate(config.releaseDate);
      this.updateReleaseNotes(config.releaseNotes);
      this.updateTotalReleaseCount(config.totalReleaseCount);
      this.updateVersion(config.version);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateFirstReleaseDate(firstReleaseDate?: Readonly<string>): void {
    AppConfigCoreService.getInstance().firstReleaseDate = ConfigService.getInstance().getUpdatedDate({
      context: this._serviceName,
      newValue: firstReleaseDate,
      oldValue: AppConfigService.getInstance().getFirstReleaseDate(),
      valueName: AppConfigValueNameEnum.FIRST_RELEASE_DATE,
    });
  }

  public updateInitializationDate(initializationDate?: Readonly<string>): void {
    AppConfigCoreService.getInstance().initializationDate = ConfigService.getInstance().getUpdatedDate({
      context: this._serviceName,
      newValue: initializationDate,
      oldValue: AppConfigService.getInstance().getInitializationDate(),
      valueName: AppConfigValueNameEnum.INITIALIZATION_DATE,
    });
  }

  public updateProductionState(isProduction?: Readonly<boolean>): void {
    AppConfigCoreService.getInstance().isProduction = ConfigService.getInstance().getUpdatedBoolean({
      context: this._serviceName,
      newValue: isProduction,
      oldValue: AppConfigService.getInstance().isProduction(),
      valueName: AppConfigValueNameEnum.IS_PRODUCTION,
    });
  }

  public updateReleaseDate(releaseDate?: Readonly<string>): void {
    AppConfigCoreService.getInstance().releaseDate = ConfigService.getInstance().getUpdatedDate({
      context: this._serviceName,
      newValue: releaseDate,
      oldValue: AppConfigService.getInstance().getReleaseDate(),
      valueName: AppConfigValueNameEnum.RELEASE_DATE,
    });
  }

  public updateReleaseNotes(releaseNotes?: Readonly<string>): void {
    AppConfigCoreService.getInstance().releaseNotes = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      isValueDisplay: false,
      newValue: releaseNotes,
      oldValue: AppConfigService.getInstance().getReleaseNotes(),
      valueName: AppConfigValueNameEnum.RELEASE_NOTES,
    });
    this._setReleaseType();
  }

  public updateTotalReleaseCount(totalReleaseCount?: Readonly<number>): void {
    AppConfigCoreService.getInstance().totalReleaseCount = ConfigService.getInstance().getUpdatedNumber({
      context: this._serviceName,
      newValue: totalReleaseCount,
      oldValue: AppConfigService.getInstance().getTotalReleaseCount(),
      valueName: AppConfigValueNameEnum.TOTAL_RELEASE_COUNT,
    });
  }

  public updateVersion(version?: Readonly<string>): void {
    AppConfigCoreService.getInstance().version = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: version,
      oldValue: AppConfigService.getInstance().getVersion(),
      valueName: AppConfigValueNameEnum.VERSION,
    });
  }

  private _setProductionState(): void {
    this.updateProductionState(isNodeProduction());
  }

  private _setBuildDate(): void {
    if (!AppConfigService.getInstance().isProduction()) {
      this.updateInitializationDate(TimeService.getInstance().now());
    }
  }

  private _setReleaseType(): void {
    AppConfigCoreService.getInstance().releaseType = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: ReleaseTypeService.getInstance().getReleaseType(AppConfigCoreService.getInstance().releaseNotes),
      oldValue: AppConfigService.getInstance().getReleaseType(),
      valueName: AppConfigValueNameEnum.RELEASE_TYPE,
    });
  }
}
