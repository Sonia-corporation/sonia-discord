const LoggerModule = require('../logger/logger');
const DiscordClientModule = require('./client');
const DiscordBotModule = require('./bot');
const chalk = require('../logger/chalk');
const _ = require('lodash');

class DiscordMessage {
  constructor() {
    this._logger = new LoggerModule.Logger().getInstance();
    this._client = new DiscordClientModule.Client().getInstance().getClient();
    this._bot = new DiscordBotModule.Bot().getInstance();

    this._init();
  }

  _init() {
    this._listen();
  }

  _listen() {
    this._client.on('message', (message) => {
      this._handleMessage(message);
    });

    this._logger.debug(this.constructor.name, chalk.white(`listen messages`));
  }

  _handleMessage(message) {
    if (_.isEqual(message.channel.type, 'dm')) {
      this._dmMessage(message);
    } else if (_.isEqual(message.channel.type, 'text')) {
      this._textMessage(message);
    }
  }

  _dmMessage(message) {
    if (!_.isEqual(message.author.id, this._bot.getId())) {
      this._sendMessage(message, 'Il est midi !');
    }
  }

  _textMessage(message) {
    if (!_.isEqual(message.author.id, this._bot.getId())) {
      this._sendMessage(message, 'Il est midi !');
    }
  }

  _sendMessage(message, responseMessage) {
    message.channel.send(responseMessage);

    this._logger.log(this.constructor.name, chalk.white(`message sent`));
  }
}

module.exports.Message = DiscordMessage;
