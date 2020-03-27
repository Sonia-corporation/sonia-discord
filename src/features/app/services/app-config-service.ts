import _ from 'lodash';
import moment from 'moment';
import { ConfigService } from '../../../classes/config-service';
import { isValidDate } from '../../../functions/checks/is-valid-date';
import { wrapInQuotes } from '../../../functions/formatters/wrap-in-quotes';
import { PartialNested } from '../../../types/partial-nested';
import { isNodeProduction } from '../../node/functions/is-node-production';
import { APP_CONFIG } from '../constants/app-config';
import { AppProductionStateEnum } from '../enums/app-production-state.enum';
import { IAppConfig } from '../interfaces/app-config';

export class AppConfigService extends ConfigService<IAppConfig> {
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

  public init(): AppConfigService {
    this._defineProductionState();
    this._defineBuildDate();

    return this;
  }

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

  public getVersion(): string {
    return APP_CONFIG.version;
  }

  public updateVersion(version?: Readonly<string>): void {
    if (_.isString(version)) {
      APP_CONFIG.version = version;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`app version updated to: ${this._chalkService.value(wrapInQuotes(APP_CONFIG.version))}`)
      });
    }
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

  public updateReleaseDate(date?: Readonly<string>): void {
    if (_.isString(date)) {
      APP_CONFIG.releaseDate = date;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`app release date updated to: ${this._chalkService.value(wrapInQuotes(APP_CONFIG.releaseDate))}`)
      });
    }
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

  public updateInitializationDate(date?: Readonly<string>): void {
    if (_.isString(date)) {
      APP_CONFIG.initializationDate = date;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`app initialization date updated to: ${this._chalkService.value(wrapInQuotes(APP_CONFIG.initializationDate))}`)
      });
    }
  }

  public isProduction(): boolean {
    return APP_CONFIG.isProduction;
  }

  public getProductionStateHumanized(): AppProductionStateEnum {
    return APP_CONFIG.isProduction ? AppProductionStateEnum.PRODUCTION : AppProductionStateEnum.DEVELOPMENT;
  }

  public updateProductionState(isProduction?: Readonly<boolean>): void {
    if (_.isBoolean(isProduction)) {
      APP_CONFIG.isProduction = isProduction;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`app production state updated to: ${this._chalkService.value(APP_CONFIG.isProduction)}`)
      });
    }
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

  public updateTotalReleaseCount(count?: Readonly<number>): void {
    if (_.isNumber(count)) {
      APP_CONFIG.totalReleaseCount = count;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`app total release count updated to: ${this._chalkService.value(APP_CONFIG.totalReleaseCount)}`)
      });
    }
  }

  public getReleaseNotes(): string {
    return APP_CONFIG.releaseNotes;
  }

  public updateReleaseNotes(notes?: Readonly<string>): void {
    if (_.isString(notes)) {
      APP_CONFIG.releaseNotes = notes;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`app release notes updated`)
      });
    }
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
