import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { LoggerService } from "../../../logger/services/logger.service";
import { isNodeProduction } from "../../../node/functions/is-node-production";
import { TimeService } from "../../../time/services/time.service";
import { AppConfigValueNameEnum } from "../../enums/app-config-value-name.enum";
import { IAppConfig } from "../../interfaces/app-config";
import { AppConfigCoreService } from "./app-config-core.service";
import { AppConfigService } from "./app-config.service";

export class AppConfigMutatorService extends AbstractConfigService<IAppConfig> {
  private static _instance: AppConfigMutatorService;

  public static getInstance(
    config?: Readonly<PartialNested<IAppConfig>>
  ): AppConfigMutatorService {
    if (_.isNil(AppConfigMutatorService._instance)) {
      AppConfigMutatorService._instance = new AppConfigMutatorService(config);
    }

    return AppConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _timeService: TimeService = TimeService.getInstance();
  private _appConfigCoreService: AppConfigCoreService = AppConfigCoreService.getInstance();
  private _appConfigService: AppConfigService = AppConfigService.getInstance();

  public constructor(config?: Readonly<PartialNested<IAppConfig>>) {
    super(ServiceNameEnum.APP_CONFIG_MUTATOR_SERVICE, config);
  }

  public init(): AppConfigMutatorService {
    this._setProductionState();
    this._setBuildDate();

    return this;
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._timeService = TimeService.getInstance();
    this._appConfigCoreService = AppConfigCoreService.getInstance();
    this._appConfigService = AppConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<PartialNested<IAppConfig>>): void {
    if (!_.isNil(config)) {
      this.updateFirstReleaseDate(config.firstReleaseDate);
      this.updateInitializationDate(config.initializationDate);
      this.updateProductionState(config.isProduction);
      this.updateReleaseDate(config.releaseDate);
      this.updateReleaseNotes(config.releaseNotes);
      this.updateTotalReleaseCount(config.totalReleaseCount);
      this.updateVersion(config.version);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateFirstReleaseDate(firstReleaseDate?: Readonly<string>): void {
    this._appConfigCoreService.firstReleaseDate = this._configService.getUpdatedDate(
      {
        context: this._serviceName,
        newValue: firstReleaseDate,
        oldValue: this._appConfigService.getFirstReleaseDate(),
        valueName: AppConfigValueNameEnum.FIRST_RELEASE_DATE,
      }
    );
  }

  public updateInitializationDate(initializationDate?: Readonly<string>): void {
    this._appConfigCoreService.initializationDate = this._configService.getUpdatedDate(
      {
        context: this._serviceName,
        newValue: initializationDate,
        oldValue: this._appConfigService.getInitializationDate(),
        valueName: AppConfigValueNameEnum.INITIALIZATION_DATE,
      }
    );
  }

  public updateProductionState(isProduction?: Readonly<boolean>): void {
    this._appConfigCoreService.isProduction = this._configService.getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: isProduction,
        oldValue: this._appConfigService.isProduction(),
        valueName: AppConfigValueNameEnum.IS_PRODUCTION,
      }
    );
  }

  public updateReleaseDate(releaseDate?: Readonly<string>): void {
    this._appConfigCoreService.releaseDate = this._configService.getUpdatedDate(
      {
        context: this._serviceName,
        newValue: releaseDate,
        oldValue: this._appConfigService.getReleaseDate(),
        valueName: AppConfigValueNameEnum.RELEASE_DATE,
      }
    );
  }

  public updateReleaseNotes(releaseNotes?: Readonly<string>): void {
    this._appConfigCoreService.releaseNotes = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        isValueDisplay: false,
        newValue: releaseNotes,
        oldValue: this._appConfigService.getReleaseNotes(),
        valueName: AppConfigValueNameEnum.RELEASE_NOTES,
      }
    );
  }

  public updateTotalReleaseCount(totalReleaseCount?: Readonly<number>): void {
    this._appConfigCoreService.totalReleaseCount = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: totalReleaseCount,
        oldValue: this._appConfigService.getTotalReleaseCount(),
        valueName: AppConfigValueNameEnum.TOTAL_RELEASE_COUNT,
      }
    );
  }

  public updateVersion(version?: Readonly<string>): void {
    this._appConfigCoreService.version = this._configService.getUpdatedString({
      context: this._serviceName,
      newValue: version,
      oldValue: this._appConfigService.getVersion(),
      valueName: AppConfigValueNameEnum.VERSION,
    });
  }

  private _setProductionState(): void {
    this.updateProductionState(isNodeProduction());
  }

  private _setBuildDate(): void {
    if (!this._appConfigService.isProduction()) {
      this.updateInitializationDate(this._timeService.now());
    }
  }
}
