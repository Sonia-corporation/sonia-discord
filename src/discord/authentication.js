const DiscordModule = require('discord.js');
const LoggerModule = require('../logger/logger');
const chalk = require('../logger/chalk');

class DiscordAuthentication {
  logger;
  client;

  constructor(environment) {
    this.logger = new LoggerModule.logger().getInstance();
    this.client = new DiscordModule.Client();

    this.init(environment);
  }

  init(environment) {
    this._listen();
    this._login(environment);
  }

  _listen() {
    this.client.on('ready', () => {
      this.logger.log('DiscordAuthentication', chalk.white(`authenticated as: ${chalk.cyan(`"${this.client.user.tag}`)}"`));
    });
  }

  _login(environment) {
    this.client.login(environment.discord.botSecretToken).then(() => {
      this.logger.debug('DiscordAuthentication', chalk.white(`authentication successful`));
    }).catch(() => {
      this.logger.error('DiscordAuthentication', chalk.white(`authentication failed`));
    });

    this.logger.debug('DiscordAuthentication', chalk.white(`authenticating...`));
  }
}

module.exports.authentication = DiscordAuthentication;
