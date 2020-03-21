import { LoggerConfigLevelEnum } from '../../logger/enums/logger-config-level.enum';

export interface IEnvironmentLogger {
  isEnabled?: boolean;
  level?: LoggerConfigLevelEnum;
}
