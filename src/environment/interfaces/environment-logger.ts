import { LoggerConfigLevelEnum } from "../../features/logger/enums/logger-config-level.enum";
import { IEnvironmentProfile } from "./environment-profile";

export interface IEnvironmentLogger {
  isEnabled?: boolean;
  level?: LoggerConfigLevelEnum;
  profile?: IEnvironmentProfile;
}
