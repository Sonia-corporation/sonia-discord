const _ = require('lodash');
const chalk = require('./chalk');

class Logger {
  config = {
    level: 'off'
  };

  constructor(config) {
    if (_.isPlainObject(config)) {
      this.updateLevel(config);
    }

    this.debug(this.constructor.name, chalk.white(`configuration updated`));
  }

  updateLevel(config) {
    if (_.isString(config.level)) {
      this.config.level = config.level;

      this.debug(this.constructor.name, chalk.white(`level updated to: ${chalk.cyan(`"${config.level}"`)}`));
    }
  }

  log() {
    if (this.config.level === 'debug' || this.config.level === 'log') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.log(`${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.log(`${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  debug(message) {
    if (this.config.level === 'debug') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.debug(`${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.debug(`${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  error(message) {
    if (this.config.level === 'debug' || this.config.level === 'log' || this.config.level === 'error') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.error(`${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.error(`${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  _context(name) {
    return chalk.context(`[${name}] `);
  }
}

class Singleton {
  constructor(config) {
    if (!Singleton.instance) {
      Singleton.instance = new Logger(config);
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports.logger = Singleton;
