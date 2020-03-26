import express from 'express';
import _ from 'lodash';
import { AppConfigService } from '../../app/services/app-config-service';
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
  private readonly _appConfigService = AppConfigService.getInstance();
  private readonly _port = 3001;
  private readonly _app = express();
  private readonly _className = `ServerService`;

  public constructor() {
    this._initializeApp();
  }

  private _initializeApp(): void {
    this._createScoutMiddleware();
    this._listen();
  }

  private _listen(): void {
    this._app.listen(this._port, (): void => {
      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`listening on port: ${this._chalkService.value(this._port)}`)
      });
    });
  }

  private _createScoutMiddleware(): void {
    if (this._appConfigService.isProduction()) {
      /**
       * @description
       * Not compatible with Windows for now
       * Could not find a way to properly handle errors to run it on production only
       * Issue: https://github.com/scoutapp/scout_apm_node/issues/187
       *
       * this._app.use(scout.expressMiddleware());
       */
    }
  }
}
