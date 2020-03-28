import _ from 'lodash';
import moment from 'moment';
import { AbstractConfigService } from '../../../classes/abstract-config-service';
import { isValidDate } from '../../../functions/checks/is-valid-date';
import { PartialNested } from '../../../types/partial-nested';
import { isNodeProduction } from '../../node/functions/is-node-production';
import { APP_CONFIG } from '../constants/app-config';
import { AppProductionStateEnum } from '../enums/app-production-state.enum';
import { IAppConfig } from '../interfaces/app-config';

export class AppConfigService extends AbstractConfigService<IAppConfig> {
  private static _instance: AppConfigService;

  public static getInstance(config?: Readonly<PartialNested<IAppConfig>>): AppConfigService {
    if (_.isNil(AppConfigService._instance)) {
      AppConfigService._instance = new AppConfigService(config);
    }

    return AppConfigService._instance;
  }

  protected readonly _className = `AppConfigService`;

  protected constructor(config?: Readonly<PartialNested<IAppConfig>>) {
    super(config);
  }

  // @todo add coverage
  public init(): AppConfigService {
    this._defineProductionState();
    this._defineBuildDate();

    return this;
  }

  // @todo add coverage
  public updateConfig(config?: Readonly<PartialNested<IAppConfig>>): void {
    if (!_.isNil(config)) {
      this.updateVersion(config.version);
      this.updateReleaseDate(config.releaseDate);
      this.updateInitializationDate(config.initializationDate);
      this.updateTotalReleaseCount(config.totalReleaseCount);
      this.updateReleaseNotes(config.releaseNotes);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }

  public getConfig(): IAppConfig {
    return APP_CONFIG;
  }

  public getVersion(): string {
    return APP_CONFIG.version;
  }

  public updateVersion(version?: Readonly<string>): void {
    APP_CONFIG.version = this._configService.getUpdatedString({
      context: this._className,
      newValue: version,
      oldValue: APP_CONFIG.version,
      valueName: `version`
    });
  }

  public getReleaseDate(): string {
    return APP_CONFIG.releaseDate;
  }

  public getReleaseDateHumanized(): string {
    if (isValidDate(APP_CONFIG.releaseDate)) {
      return _.capitalize(moment(APP_CONFIG.releaseDate).fromNow());
    }

    return APP_CONFIG.releaseDate;
  }

  public updateReleaseDate(releaseDate?: Readonly<string>): void {
    APP_CONFIG.releaseDate = this._configService.getUpdatedString({
      context: this._className,
      newValue: releaseDate,
      oldValue: APP_CONFIG.releaseDate,
      valueName: `release date`
    });
  }

  public getInitializationDate(): string {
    return APP_CONFIG.initializationDate;
  }

  public getInitializationDateHumanized(): string {
    if (isValidDate(APP_CONFIG.initializationDate)) {
      return _.capitalize(moment(APP_CONFIG.initializationDate).fromNow());
    }

    return APP_CONFIG.initializationDate;
  }

  public updateInitializationDate(initializationDate?: Readonly<string>): void {
    APP_CONFIG.initializationDate = this._configService.getUpdatedString({
      context: this._className,
      newValue: initializationDate,
      oldValue: APP_CONFIG.initializationDate,
      valueName: `initialization date`
    });
  }

  public isProduction(): boolean {
    return APP_CONFIG.isProduction;
  }

  public getProductionStateHumanized(): AppProductionStateEnum {
    return APP_CONFIG.isProduction ? AppProductionStateEnum.PRODUCTION : AppProductionStateEnum.DEVELOPMENT;
  }

  public updateProductionState(isProduction?: Readonly<boolean>): void {
    APP_CONFIG.isProduction = this._configService.getUpdatedBoolean({
      context: this._className,
      newValue: isProduction,
      oldValue: APP_CONFIG.isProduction,
      valueName: `production state`
    });
  }

  public getTotalReleaseCount(): number {
    return APP_CONFIG.totalReleaseCount;
  }

  public getTotalReleaseCountHumanized(): string {
    const totalReleaseCount: number = this.getTotalReleaseCount();
    let sentence = `${this.getTotalReleaseCount()} version`;

    if (_.gt(totalReleaseCount, 1)) {
      sentence = `${sentence}s`;
    }

    return sentence;
  }

  public updateTotalReleaseCount(totalReleaseCount?: Readonly<number>): void {
    APP_CONFIG.totalReleaseCount = this._configService.getUpdatedNumber({
      context: this._className,
      newValue: totalReleaseCount,
      oldValue: APP_CONFIG.totalReleaseCount,
      valueName: `total release count`
    });
  }

  public getReleaseNotes(): string {
    return APP_CONFIG.releaseNotes;
  }

  public updateReleaseNotes(releaseNotes?: Readonly<string>): void {
    APP_CONFIG.releaseNotes = this._configService.getUpdatedString({
      context: this._className,
      isValueDisplay: false,
      newValue: releaseNotes,
      oldValue: APP_CONFIG.releaseNotes,
      valueName: `release notes`
    });
  }

  private _defineProductionState(): void {
    this.updateProductionState(isNodeProduction());
  }

  private _defineBuildDate(): void {
    if (!this.isProduction()) {
      this.updateInitializationDate(moment().format());
    }
  }
}
