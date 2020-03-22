import { LoggerConfigLevelEnum } from '../logger/enums/logger-config-level.enum';
import { IEnvironment } from './interfaces/environment';

export const ENVIRONMENT: IEnvironment = {
  discord: {
    botId: '689829775317139460',
    botSecretToken: 'TO_DEFINE_ON_THE_SERVER',
    commands: {
      prefix: [
        '--',
        '!'
      ]
    }
  },
  logger: {
    isEnabled: true,
    level: LoggerConfigLevelEnum.DEBUG
  }
};
