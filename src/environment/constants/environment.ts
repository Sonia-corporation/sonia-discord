import { LoggerConfigLevelEnum } from "../../features/logger/enums/logger-config-level.enum";
import { IEnvironment } from "../interfaces/environment";

export const ENVIRONMENT: IEnvironment = {
  discord: {
    message: {
      command: {
        prefix: [`--`, `!`],
      },
    },
    sonia: {
      id: `689829775317139460`,
      secretToken: `TO_DEFINE_ON_THE_SERVER`,
    },
  },
  github: {
    personalAccessToken: `TO_DEFINE_ON_THE_SERVER`,
  },
  logger: {
    isEnabled: true,
    level: LoggerConfigLevelEnum.DEBUG,
  },
};
