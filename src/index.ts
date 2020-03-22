import appRootPath from 'app-root-path';
import fs from 'fs-extra';
import _ from 'lodash';
import { ENVIRONMENT } from './environment/environment';
import { IEnvironment } from './environment/interfaces/environment';
import { AppConfigService } from './features/app/app-config-service';
import { DiscordService } from './features/discord/discord-service';
import { DiscordMessageConfigService } from './features/discord/messages/discord-message-config-service';
import { DiscordSoniaConfigService } from './features/discord/users/discord-sonia-config-service';
import { LoggerConfigService } from './features/logger/logger-config-service';
import { ServerService } from './features/server/server-service';
import { IPackage } from './interfaces/package';

function configureAppFromPackage(): void {
  fs.readJson(`${appRootPath}/package.json`).then((data: Readonly<IPackage>): void => {
    AppConfigService.getInstance().updateConfig({
      version: data.version
    });
  }).catch((error: unknown): void => {
    console.error(`Failed to read the package file`);
    console.error(error);
  });
}

function configureAppFromEnvironment(environment: Readonly<IEnvironment>): void {
  LoggerConfigService.getInstance().updateConfig(environment.logger);
  DiscordSoniaConfigService.getInstance().updateConfig(environment.discord);
  DiscordMessageConfigService.getInstance().updateConfig(environment.discord);
}

function configureApp(environment: Readonly<IEnvironment>): void {
  configureAppFromEnvironment(environment);
  configureAppFromPackage();
}

function runApp(): void {
  DiscordService.getInstance();
  ServerService.getInstance();
}

function startApp(environment: Readonly<IEnvironment>): void {
  configureApp(environment);
  runApp();
}

function mergeEnvironments(
  environmentA: Readonly<IEnvironment>,
  environmentB: Readonly<IEnvironment>
): IEnvironment {
  return _.merge(
    {},
    environmentA,
    environmentB
  );
}

fs.readJson(`${appRootPath}/src/environment/secret-environment.json`).then((environment: Readonly<IEnvironment>): void => {
  startApp(mergeEnvironments(ENVIRONMENT, environment));
}).catch((error: unknown): void => {
  console.error(`Failed to read the environment file`);
  console.error(error);
  throw new Error(`The app must have an environment file with at least a "discord.sonia.secretToken" inside it`);
});

