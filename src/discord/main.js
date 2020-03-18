const DiscordAuthenticationModule = require('./authentication');
const LoggerModule = require('../logger/logger');

class Discord {
  logger;

  constructor(environment) {
    this.logger = new LoggerModule.logger().getInstance();

    this.main(environment);
  }

  main(environment) {
    this.authenticate(environment);
  }

  authenticate(environment) {
    new DiscordAuthenticationModule.authentication(environment);
  }
}

module.exports.discord = Discord;
