const Discord = require('discord.js');
const _ = require('lodash');
const LoggerModule = require('../logger/logger');
const chalk = require('../logger/chalk');

class DiscordClient {
  constructor() {
    this._logger = new LoggerModule.Logger().getInstance();
    this._client = new Discord.Client();

    this._logger.debug(this.constructor.name, chalk.white(`client created`));
  }

  getClient() {
    return this._client;
  }
}

class Singleton {
  constructor() {
    if (_.isNil(Singleton.instance)) {
      Singleton.instance = new DiscordClient();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports.Client = Singleton;
