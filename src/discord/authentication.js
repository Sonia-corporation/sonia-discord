const LoggerModule = require('../logger/logger');
const chalk = require('../logger/chalk');
const DiscordClientModule = require('./client');
const DiscordBotModule = require('./bot');

class DiscordAuthentication {
  constructor() {
    this._logger = new LoggerModule.Logger().getInstance();
    this._client = new DiscordClientModule.Client().getInstance().getClient();
    this._bot = new DiscordBotModule.Bot().getInstance();

    this._init();
  }

  _init() {
    this._listen();
    this._login();
  }

  _listen() {
    this._client.on('ready', () => {
      this._logger.log(this.constructor.name, chalk.white(`authenticated as: ${chalk.cyan(`"${this._client.user.tag}`)}"`));
    });
  }

  _login() {
    this._client.login(this._bot.getSecretToken()).then(() => {
      this._logger.debug(this.constructor.name, chalk.white(`authentication successful`));
    }).catch((error) => {
      this._logger.error(this.constructor.name, chalk.white(`authentication failed`));
      this._logger.error(this.constructor.name, chalk.red(error));
    });

    this._logger.debug(this.constructor.name, chalk.white(`authenticating...`));
  }
}

module.exports.Authentication = DiscordAuthentication;
