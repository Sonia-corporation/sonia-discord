const fs = require('fs-extra');
const DiscordModule = require('./discord/main');
const LoggerModule = require('./logger/logger');

fs.readJson('./environment.json').then((environment) => {
  new LoggerModule.logger(environment.logger).getInstance();
  new DiscordModule.discord(environment);
}).catch(() => {
  console.error('Failed to read the environment');
});
