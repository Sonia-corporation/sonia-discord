import { ILoggerLog } from './logger-log';
import { LoggerConfigLevelEnum } from '../enums/logger-config-level.enum';

export interface ILoggerLogInternal extends ILoggerLog {
  loggerLogType: LoggerConfigLevelEnum;
}
