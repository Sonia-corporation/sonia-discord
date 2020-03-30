import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { ILoggerLog } from "./logger-log";

export interface ILoggerLogInternal extends ILoggerLog {
  loggerLogType: LoggerConfigLevelEnum;
}
