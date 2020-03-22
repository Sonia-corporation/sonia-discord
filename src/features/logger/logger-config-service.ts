import _ from 'lodash';
import {
  chalkText,
  chalkValue
} from './chalk';
import { ILoggerConfig } from './interfaces/logger-config';
import { LOGGER_CONFIG } from './logger-config';
import { LoggerService } from './logger-service';

export class LoggerConfigService {
  private static _instance: LoggerConfigService;

  public static getInstance(config?: Readonly<Partial<ILoggerConfig>>): LoggerConfigService {
    if (_.isNil(LoggerConfigService._instance)) {
      LoggerConfigService._instance = new LoggerConfigService(config);
    }

    return LoggerConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _className = 'LoggerConfigService';

  public constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateEnabledState(config);
      this.updateLevel(config);

      this._loggerService.debug(this._className, chalkText(`configuration updated`));
    }
  }

  public updateEnabledState(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isBoolean(config.isEnabled)) {
      LOGGER_CONFIG.isEnabled = config.isEnabled;

      this._loggerService.log(this._className, chalkText(`enabled state updated to: ${chalkValue(LOGGER_CONFIG.isEnabled)}`));
    }
  }

  public updateLevel(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isString(config.level)) {
      LOGGER_CONFIG.level = config.level;

      this._loggerService.log(this._className, chalkText(`level updated to: ${chalkValue(`"${LOGGER_CONFIG.level}"`)}`));
    }
  }
}
