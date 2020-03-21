import appRootPath from 'app-root-path';
import fs from 'fs-extra';
import _ from 'lodash';
import { Discord } from './discord/discord';
import { ENVIRONMENT } from './environment/environment';
import { IEnvironment } from './environment/interfaces/environment';
import { Logger } from './logger/logger';
import { Server } from './server/server';

function startApp(environment: Readonly<IEnvironment>): void {
  Logger.getInstance(environment.logger);
  Server.getInstance();
  Discord.getInstance(environment.discord);
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
  console.error('Failed to read the environment');
  console.error(error);
  throw new Error('Could not start the app with a proper environment file');
});

