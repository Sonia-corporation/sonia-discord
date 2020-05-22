import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { LoggerConfigCoreService } from "./logger-config-core.service";

export class LoggerConfigService extends AbstractService {
  private static _instance: LoggerConfigService;

  public static getInstance(): LoggerConfigService {
    if (_.isNil(LoggerConfigService._instance)) {
      LoggerConfigService._instance = new LoggerConfigService();
    }

    return LoggerConfigService._instance;
  }

  private readonly _loggerConfigCoreService: LoggerConfigCoreService = LoggerConfigCoreService.getInstance();

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
    return this._loggerConfigCoreService.isEnabled;
  }

  public getLevel(): LoggerConfigLevelEnum {
    return this._loggerConfigCoreService.level;
  }
}
