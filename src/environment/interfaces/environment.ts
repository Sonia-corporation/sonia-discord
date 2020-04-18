import { IEnvironmentApp } from "@app/environment/interfaces/environment-app";
import { IEnvironmentDiscord } from "@app/environment/interfaces/environment-discord";
import { IEnvironmentGithub } from "@app/environment/interfaces/environment-github";
import { IEnvironmentLogger } from "@app/environment/interfaces/environment-logger";
import { IEnvironmentProfile } from "@app/environment/interfaces/environment-profile";

export interface IEnvironment {
  app?: IEnvironmentApp;
  discord: IEnvironmentDiscord;
  github?: IEnvironmentGithub;
  logger?: IEnvironmentLogger;
  profile?: IEnvironmentProfile;
}
