import { IEnvironmentDiscord } from './environment-discord';
import { IEnvironmentLogger } from './environment-logger';

export interface IEnvironment {
  discord: IEnvironmentDiscord;
  logger?: IEnvironmentLogger;
}
