import { IEnvironmentProfile } from "@app/environment/interfaces/environment-profile";
import { LoggerConfigLevelEnum } from "@app/features/logger/enums/logger-config-level.enum";

export interface IEnvironmentLogger {
  isEnabled?: boolean;
  level?: LoggerConfigLevelEnum;
  profile?: IEnvironmentProfile;
}
