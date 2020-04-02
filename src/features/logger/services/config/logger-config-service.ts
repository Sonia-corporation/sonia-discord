import _ from "lodash";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { LoggerConfigCoreService } from "./logger-config-core-service";

export class LoggerConfigService {
  private static _instance: LoggerConfigService;

  public static getInstance(): LoggerConfigService {
    if (_.isNil(LoggerConfigService._instance)) {
      LoggerConfigService._instance = new LoggerConfigService();
    }

    return LoggerConfigService._instance;
  }

  protected readonly _loggerConfigCoreService = LoggerConfigCoreService.getInstance();
  protected readonly _className = `LoggerConfigService`;

  public getLogger(): ILoggerConfig {
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
