const LoggerModule = require('../logger/logger');
const DiscordClientModule = require('./client');

class DiscordGuild {
  constructor() {
    this._logger = new LoggerModule.Logger().getInstance();
    this._client = new DiscordClientModule.Client().getInstance().getClient();

    this._init();
  }

  _init() {
    this._listen();
  }

  _listen() {
    this._client.on('ready', () => {
      this._client.guilds.every((guild) => {
        console.log(' - ' + guild.name);
      });
    });
  }
}

module.exports.Guild = DiscordGuild;
