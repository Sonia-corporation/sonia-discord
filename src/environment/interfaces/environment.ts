import { IEnvironmentApp } from './environment-app';
import { IEnvironmentDiscord } from './environment-discord';
import { IEnvironmentLogger } from './environment-logger';

export interface IEnvironment {
  app?: IEnvironmentApp;
  discord: IEnvironmentDiscord;
  logger?: IEnvironmentLogger;
}
