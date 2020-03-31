import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";

export interface ILoggerConfig {
  isEnabled: boolean;
  level: LoggerConfigLevelEnum;
}
