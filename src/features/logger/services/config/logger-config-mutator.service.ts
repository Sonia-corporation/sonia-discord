import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/services/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { ConfigService } from "../../../config/services/config.service";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { LoggerConfigValueNameEnum } from "../../enums/logger-config-value-name.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { ChalkService } from "../chalk/chalk.service";
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

  public constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    super(ServiceNameEnum.LOGGER_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    LoggerConfigCoreService.getInstance();
    LoggerConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<Partial<ILoggerConfig>>): void {
    if (!_.isNil(config)) {
      this.updateEnabledState(config.isEnabled);
      this.updateLevel(config.level);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateEnabledState(isEnabled?: Readonly<boolean>): void {
    LoggerConfigCoreService.getInstance().isEnabled = ConfigService.getInstance().getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: isEnabled,
        oldValue: LoggerConfigService.getInstance().isEnabled(),
        valueName: LoggerConfigValueNameEnum.IS_ENABLED,
      }
    );
  }

  public updateLevel(level?: Readonly<LoggerConfigLevelEnum>): void {
    LoggerConfigCoreService.getInstance().level = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: level,
        oldValue: LoggerConfigService.getInstance().getLevel(),
        valueName: LoggerConfigValueNameEnum.LEVEL,
      }
    );
  }
}
