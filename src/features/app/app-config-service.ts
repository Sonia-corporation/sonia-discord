import _ from 'lodash';
import moment from 'moment';
import { PartialNested } from '../../types/partial-nested';
import { ChalkService } from '../logger/chalk-service';
import { LoggerService } from '../logger/logger-service';
import { isNodeProduction } from '../node/functions/is-node-production';
import { APP_CONFIG } from './app-config';
import { IAppConfig } from './interfaces/app-config';

export class AppConfigService {
  private static _instance: AppConfigService;

  public static getInstance(config?: Readonly<PartialNested<IAppConfig>>): AppConfigService {
    if (_.isNil(AppConfigService._instance)) {
      AppConfigService._instance = new AppConfigService(config);
    }

    return AppConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `AppConfigService`;

  public constructor(config?: Readonly<PartialNested<IAppConfig>>) {
    this._defineBuildDate();
    this.updateConfig(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IAppConfig>>): void {
    if (!_.isNil(config)) {
      this.updateVersion(config.version);

      this._loggerService.debug(this._className, this._chalkService.text(`configuration updated`));
    }
  }

  public getVersion(): string {
    return APP_CONFIG.version;
  }

  public updateVersion(version?: string): void {
    if (_.isString(version)) {
      APP_CONFIG.version = version;

      this._loggerService.log(this._className, this._chalkService.text(`app version updated to: ${this._chalkService.value(`"${APP_CONFIG.version}"`)}`));
    }
  }

  public getReleaseDate(): string {
    return APP_CONFIG.releaseDate;
  }

  public getReleaseDateHumanized(): string {
    if (moment(APP_CONFIG.releaseDate).isValid()) {
      return _.capitalize(moment(APP_CONFIG.releaseDate).fromNow());
    }

    return APP_CONFIG.releaseDate;
  }

  public updateReleaseDate(date?: string): void {
    if (_.isString(date)) {
      APP_CONFIG.releaseDate = date;

      this._loggerService.log(this._className, this._chalkService.text(`app release date updated to: ${this._chalkService.value(`"${APP_CONFIG.releaseDate}"`)}`));
    }
  }

  private _defineBuildDate(): void {
    const isProduction: boolean = isNodeProduction();

    if (_.isEqual(isProduction, false)) {
      this.updateReleaseDate(moment().format());
    }
  }
}
