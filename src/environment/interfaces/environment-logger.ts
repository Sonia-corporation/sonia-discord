import { IEnvironmentProfile } from './environment-profile';
import { LoggerConfigLevelEnum } from '../../features/logger/enums/logger-config-level.enum';

export interface IEnvironmentLogger {
  isEnabled?: boolean;
  level?: LoggerConfigLevelEnum;
  profile?: IEnvironmentProfile;
}
