import { LoggerConfigCoreService } from './logger-config-core.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { LoggerConfigLevelEnum } from '../../enums/logger-config-level.enum';
import { ILoggerConfig } from '../../interfaces/logger-config';
import _ from 'lodash';

export class LoggerConfigService extends AbstractService {
  private static _instance: LoggerConfigService;

  public static getInstance(): LoggerConfigService {
    if (_.isNil(LoggerConfigService._instance)) {
      LoggerConfigService._instance = new LoggerConfigService();
    }

    return LoggerConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.LOGGER_CONFIG_SERVICE);
  }

  public getConfig(): ILoggerConfig {
    return {
      isEnabled: this.isEnabled(),
      level: this.getLevel(),
    };
  }

  public isEnabled(): boolean {
    return LoggerConfigCoreService.getInstance().isEnabled;
  }

  public getLevel(): LoggerConfigLevelEnum {
    return LoggerConfigCoreService.getInstance().level;
  }
}
