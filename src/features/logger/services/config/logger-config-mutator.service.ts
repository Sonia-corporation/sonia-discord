import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { LoggerConfigValueNameEnum } from "../../enums/logger-config-value-name.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { LoggerService } from "../logger.service";
import { LoggerConfigCoreService } from "./logger-config-core.service";
import { LoggerConfigService } from "./logger-config.service";

export class LoggerConfigMutatorService extends AbstractConfigService<
  ILoggerConfig
> {
  private static _instance: LoggerConfigMutatorService;

  public static getInstance(
    config?: Readonly<Partial<ILoggerConfig>>
  ): LoggerConfigMutatorService {
    if (_.isNil(LoggerConfigMutatorService._instance)) {
      LoggerConfigMutatorService._instance = new LoggerConfigMutatorService(
        config
      );
    }

    return LoggerConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _loggerConfigCoreService: LoggerConfigCoreService = LoggerConfigCoreService.getInstance();
  private _loggerConfigService: LoggerConfigService = LoggerConfigService.getInstance();

  public constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    super(ServiceNameEnum.LOGGER_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._loggerConfigCoreService = LoggerConfigCoreService.getInstance();
    this._loggerConfigService = LoggerConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<Partial<ILoggerConfig>>): void {
    if (!_.isNil(config)) {
      this.updateEnabledState(config.isEnabled);
      this.updateLevel(config.level);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateEnabledState(isEnabled?: Readonly<boolean>): void {
    this._loggerConfigCoreService.isEnabled = this._configService.getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: isEnabled,
        oldValue: this._loggerConfigService.isEnabled(),
        valueName: LoggerConfigValueNameEnum.IS_ENABLED,
      }
    );
  }

  public updateLevel(level?: Readonly<LoggerConfigLevelEnum>): void {
    this._loggerConfigCoreService.level = this._configService.getUpdatedString({
      context: this._serviceName,
      newValue: level,
      oldValue: this._loggerConfigService.getLevel(),
      valueName: LoggerConfigValueNameEnum.LEVEL,
    });
  }
}
