import express, { Express } from 'express';
import _ from 'lodash';
import {
  chalkValue,
  chalkText
} from '../logger/chalk';
import { Logger } from '../logger/logger';

export class Server {
  private static _instance: Server;

  public static getInstance(): Server {
    if (_.isNil(Server._instance)) {
      Server._instance = new Server();
    }

    return Server._instance;
  }

  private readonly _logger: Logger;
  private readonly _port: number;
  private readonly _app: Express;

  public constructor() {
    this._logger = Logger.getInstance();
    this._port = 3001;
    this._app = express();

    this._listen();
  }

  private _listen(): void {
    this._app.listen(this._port, () => {
      this._logger.log('Server', chalkText(`listening on port: ${chalkValue(this._port)}`));
    });
  }
}
