import _ from "lodash";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";

export class LoggerConfigCoreService implements ILoggerConfig {
  private static _instance: LoggerConfigCoreService;

  public static getInstance(): LoggerConfigCoreService {
    if (_.isNil(LoggerConfigCoreService._instance)) {
      LoggerConfigCoreService._instance = new LoggerConfigCoreService();
    }

    return LoggerConfigCoreService._instance;
  }

  public isEnabled = false;
  public level = LoggerConfigLevelEnum.DEBUG;
}
