import express from 'express';
import _ from 'lodash';
import {
  chalkText,
  chalkValue
} from '../logger/chalk';
import { LoggerService } from '../logger/logger-service';

export class ServerService {
  private static _instance: ServerService;

  public static getInstance(): ServerService {
    if (_.isNil(ServerService._instance)) {
      ServerService._instance = new ServerService();
    }

    return ServerService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _port = 3001;
  private readonly _app = express();
  private readonly _className = 'ServerService';

  public constructor() {
    this._listen();
  }

  private _listen(): void {
    this._app.listen(this._port, () => {
      this._loggerService.log(this._className, chalkText(`listening on port: ${chalkValue(this._port)}`));
    });
  }
}
