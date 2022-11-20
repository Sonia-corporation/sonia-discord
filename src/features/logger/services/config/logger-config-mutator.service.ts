import { LoggerConfigCoreService } from './logger-config-core.service';
import { LoggerConfigService } from './logger-config.service';
import { AbstractConfigService } from '../../../../classes/services/abstract-config.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ConfigService } from '../../../config/services/config.service';
import { LoggerConfigLevelEnum } from '../../enums/logger-config-level.enum';
import { LoggerConfigValueNameEnum } from '../../enums/logger-config-value-name.enum';
import { ILoggerConfig } from '../../interfaces/logger-config';
import { ChalkService } from '../chalk/chalk.service';
import { LoggerService } from '../logger.service';
import _ from 'lodash';

export class LoggerConfigMutatorService extends AbstractConfigService<ILoggerConfig> {
  private static _instance: LoggerConfigMutatorService;

  public static getInstance(config?: Partial<ILoggerConfig>): LoggerConfigMutatorService {
    if (_.isNil(LoggerConfigMutatorService._instance)) {
      LoggerConfigMutatorService._instance = new LoggerConfigMutatorService(config);
    }

    return LoggerConfigMutatorService._instance;
  }

  public constructor(config?: Partial<ILoggerConfig>) {
    super(ServiceNameEnum.LOGGER_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    LoggerConfigCoreService.getInstance();
    LoggerConfigService.getInstance();
  }

  public updateConfig(config?: Partial<ILoggerConfig>): void {
    if (!_.isNil(config)) {
      this.updateEnabledState(config.isEnabled);
      this.updateLevel(config.level);
      this.updateShouldDisplayMoreDebugLogsState(config.shouldDisplayMoreDebugLogs);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateEnabledState(isEnabled?: boolean): void {
    LoggerConfigCoreService.getInstance().isEnabled = ConfigService.getInstance().getUpdatedBoolean({
      context: this._serviceName,
      newValue: isEnabled,
      oldValue: LoggerConfigService.getInstance().isEnabled(),
      valueName: LoggerConfigValueNameEnum.IS_ENABLED,
    });
  }

  public updateLevel(level?: LoggerConfigLevelEnum): void {
    LoggerConfigCoreService.getInstance().level = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: level,
      oldValue: LoggerConfigService.getInstance().getLevel(),
      valueName: LoggerConfigValueNameEnum.LEVEL,
    });
  }

  public updateShouldDisplayMoreDebugLogsState(shouldDisplayMoreDebugLogs?: boolean): void {
    LoggerConfigCoreService.getInstance().shouldDisplayMoreDebugLogs = ConfigService.getInstance().getUpdatedBoolean({
      context: this._serviceName,
      newValue: shouldDisplayMoreDebugLogs,
      oldValue: LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(),
      valueName: LoggerConfigValueNameEnum.SHOULD_DISPLAY_MORE_DEBUG_LOGS,
    });
  }
}
