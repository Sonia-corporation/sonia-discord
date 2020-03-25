import express from 'express';
import _ from 'lodash';
import { ChalkService } from '../../logger/services/chalk-service';
import { LoggerService } from '../../logger/services/logger-service';

export class ServerService {
  private static _instance: ServerService;

  public static getInstance(): ServerService {
    if (_.isNil(ServerService._instance)) {
      ServerService._instance = new ServerService();
    }

    return ServerService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _port = 3001;
  private readonly _app = express();
  private readonly _className = `ServerService`;

  public constructor() {
    this._listen();
  }

  private _listen(): void {
    this._app.listen(this._port, (): void => {
      this._loggerService.log(this._className, this._chalkService.text(`listening on port: ${this._chalkService.value(this._port)}`));
    });
  }
}
