const DiscordAuthenticationModule = require('./authentication');
const DiscordGuildModule = require('./guild');
const DiscordMessageModule = require('./message');
const DiscordBotModule = require('./bot');
const LoggerModule = require('../logger/logger');

class Discord {
  constructor(environment) {
    this._logger = new LoggerModule.Logger().getInstance();

    this._init(environment);
  }

  _init(environment) {
    this._bot(environment.discord);
    this._authenticate();
    // this._handleGuilds();
    this._handleMessages();
  }

  _bot(discord) {
    new DiscordBotModule.Bot(discord).getInstance();
  }

  _authenticate() {
    new DiscordAuthenticationModule.Authentication();
  }

  _handleGuilds() {
    new DiscordGuildModule.Guild();
  }

  _handleMessages() {
    new DiscordMessageModule.Message();
  }
}

module.exports.Discord = Discord;
