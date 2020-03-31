import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { ILoggerConfig } from "../interfaces/logger-config";

export const LOGGER_CONFIG: ILoggerConfig = {
  isEnabled: false,
  level: LoggerConfigLevelEnum.DEBUG,
};
