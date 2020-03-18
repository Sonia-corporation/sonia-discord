const express = require('express');
const LoggerModule = require('../logger/logger');
const chalk = require('../logger/chalk');

class Server {
  constructor() {
    this._logger = new LoggerModule.Logger().getInstance();
    this._port = 3001;
    this._app = express();

    this._listen();
  }

  _listen() {
    this._app.listen(this._port, () => {
      this._logger.log('Server', chalk.white(`listening on port: ${chalk.cyan(this._port)}`));
    });
  }
}

module.exports.Server = Server;
