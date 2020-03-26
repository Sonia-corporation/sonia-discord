import { LoggerLogTypeEnum } from '../enums/logger-log-type.enum';
import { ILoggerLog } from './logger-log';

export interface ILoggerLogInternal {
  loggerLog: ILoggerLog;
  loggerLogType: LoggerLogTypeEnum;
}
