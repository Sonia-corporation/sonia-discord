import _ from "lodash";
import { AbstractConfigService } from "../../../classes/abstract-config-service";
import { LOGGER_CONFIG } from "../constants/logger-config";
import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { ILoggerConfig } from "../interfaces/logger-config";

export class LoggerConfigService extends AbstractConfigService<ILoggerConfig> {
  private static _instance: LoggerConfigService;

  public static getInstance(
    config?: Readonly<Partial<ILoggerConfig>>
  ): LoggerConfigService {
    if (_.isNil(LoggerConfigService._instance)) {
      LoggerConfigService._instance = new LoggerConfigService(config);
    }

    return LoggerConfigService._instance;
  }

  protected readonly _className = `LoggerConfigService`;

  protected constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    super(config);
  }

  // @todo add coverage
  public updateConfig(config?: Readonly<Partial<ILoggerConfig>>): void {
    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateEnabledState(config.isEnabled);
      this.updateLevel(config.level);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public getLogger(): ILoggerConfig {
    return LOGGER_CONFIG;
  }

  public isEnabled(): boolean {
    return LOGGER_CONFIG.isEnabled;
  }

  public updateEnabledState(isEnabled?: Readonly<boolean>): void {
    LOGGER_CONFIG.isEnabled = this._configService.getUpdatedBoolean({
      context: this._className,
      newValue: isEnabled,
      oldValue: LOGGER_CONFIG.isEnabled,
      valueName: `enable state`,
    });
  }

  public getLevel(): LoggerConfigLevelEnum {
    return LOGGER_CONFIG.level;
  }

  public updateLevel(level?: Readonly<LoggerConfigLevelEnum>): void {
    LOGGER_CONFIG.level = this._configService.getUpdatedString({
      context: this._className,
      newValue: level,
      oldValue: LOGGER_CONFIG.level,
      valueName: `level`,
    });
  }
}
