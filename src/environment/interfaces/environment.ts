import { IEnvironmentApp } from './environment-app';
import { IEnvironmentDiscord } from './environment-discord';
import { IEnvironmentGithub } from './environment-github';
import { IEnvironmentLogger } from './environment-logger';
import { IEnvironmentProfile } from './environment-profile';
import { IEnvironmentQuote } from './environment-quote';

export interface IEnvironment {
  app?: IEnvironmentApp;
  discord: IEnvironmentDiscord;
  github?: IEnvironmentGithub;
  logger?: IEnvironmentLogger;
  profile?: IEnvironmentProfile;
  quote?: IEnvironmentQuote;
}
