import _ from 'lodash';
import { ConfigService } from '../../../classes/config-service';
import { wrapInQuotes } from '../../../functions/formatters/wrap-in-quotes';
import { LOGGER_CONFIG } from '../constants/logger-config';
import { LoggerConfigLevelEnum } from '../enums/logger-config-level.enum';
import { ILoggerConfig } from '../interfaces/logger-config';

export class LoggerConfigService extends ConfigService<ILoggerConfig> {
  private static _instance: LoggerConfigService;

  public static getInstance(config?: Readonly<Partial<ILoggerConfig>>): LoggerConfigService {
    if (_.isNil(LoggerConfigService._instance)) {
      LoggerConfigService._instance = new LoggerConfigService(config);
    }

    return LoggerConfigService._instance;
  }

  protected readonly _className = `LoggerConfigService`;

  protected constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    super(config);
  }

  public isEnabled(): boolean {
    return LOGGER_CONFIG.isEnabled;
  }

  public updateEnabledState(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isBoolean(config.isEnabled)) {
      LOGGER_CONFIG.isEnabled = config.isEnabled;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`enable state updated to: ${this._chalkService.value(LOGGER_CONFIG.isEnabled)}`)
      });
    }
  }

  public getLevel(): LoggerConfigLevelEnum {
    return LOGGER_CONFIG.level;
  }

  public updateLevel(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isString(config.level)) {
      LOGGER_CONFIG.level = config.level;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`level updated to: ${this._chalkService.value(wrapInQuotes(LOGGER_CONFIG.level))}`)
      });
    }
  }

  protected updateConfig(config?: Readonly<Partial<ILoggerConfig>>): void {
    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateEnabledState(config);
      this.updateLevel(config);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }
}
