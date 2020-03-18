import { IEnvironment } from './environment/interfaces/environment';

const fs = require('fs-extra');
const DiscordModule = require('./discord/main');
const LoggerModule = require('./logger/logger');
const ServerModule = require('./server/server');

fs.readJson('./src/environment/environment.json').then((environment: IEnvironment): void => {
  new LoggerModule.Logger(environment.logger).getInstance();
  new ServerModule.Server();
  new DiscordModule.Discord(environment);
}).catch((error: any): void => {
  console.error('Failed to read the environment');
  console.error(error);
});
