const LoggerModule = require('../logger/logger');
const chalk = require('../logger/chalk');
const _ = require('lodash');

class DiscordBot {
  constructor(config) {
    this._logger = new LoggerModule.Logger().getInstance();
    this._id = null;
    this._secretToken = null;

    this.updateId(config.botId);
    this.updateSecretToken(config.botSecretToken);
  }

  getId() {
    return this._id;
  }

  updateId(id) {
    if (_.isString(id)) {
      this._id = id;

      this._logger.log(this.constructor.name, `id updated to: ${chalk.cyan(`"${id}"`)}`);
    }
  }

  getSecretToken() {
    return this._secretToken;
  }

  updateSecretToken(secretToken) {
    if (_.isString(secretToken)) {
      this._secretToken = secretToken;

      this._logger.log(this.constructor.name, `secretToken updated to: ${chalk.cyan(`"********"`)}`);
    }
  }
}

class Singleton {
  constructor(discord) {
    if (_.isNil(Singleton.instance)) {
      Singleton.instance = new DiscordBot(discord);
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports.Bot = Singleton;
