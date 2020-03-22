import appRootPath from 'app-root-path';
import fs from 'fs-extra';
import _ from 'lodash';
import { ENVIRONMENT } from './environment/environment';
import { IEnvironment } from './environment/interfaces/environment';
import { DiscordService } from './features/discord/discord-service';
import { LoggerConfigService } from './features/logger/logger-config-service';
import { ServerService } from './features/server/server-service';

function startApp(environment: Readonly<IEnvironment>): void {
  LoggerConfigService.getInstance(environment.logger);
  ServerService.getInstance();
  DiscordService.getInstance(environment.discord);
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
  console.error('Failed to read the environment file');
  console.error(error);
  throw new Error('The app must have an environment file with at least a "discord.botSecretToken" inside it');
});

