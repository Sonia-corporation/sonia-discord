import fs from 'fs-extra';
import { Discord } from './discord/discord';
import { IEnvironment } from './environment/interfaces/environment';
import { Logger } from './logger/logger';
import { Server } from './server/server';

fs.readJson('./src/environment/environment.json').then((environment: IEnvironment): void => {
  Logger.getInstance(environment.logger);
  Server.getInstance();
  Discord.getInstance(environment.discord);
}).catch((error: unknown): void => {
  console.error('Failed to read the environment');
  console.error(error);
});
