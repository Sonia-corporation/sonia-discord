import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { LoggerConfigProfile } from "./logger-config-profil";

export interface ILoggerConfig {
  isEnabled: boolean;
  level: LoggerConfigLevelEnum;
  profile: LoggerConfigProfile;
}
