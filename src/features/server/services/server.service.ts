import scout from "@scout_apm/scout-apm";
import { path } from "app-root-path";
import express, { Express } from "express";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { AppConfigService } from "../../app/services/config/app-config.service";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { ServerConfigService } from "./config/server-config.service";

export class ServerService extends AbstractService {
  private static _instance: ServerService;

  public static getInstance(): ServerService {
    if (_.isNil(ServerService._instance)) {
      ServerService._instance = new ServerService();
    }

    return ServerService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();
  private readonly _serverConfigService: ServerConfigService = ServerConfigService.getInstance();
  private _app: Express | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.SERVER_SERVICE);
  }

  public initializeApp(): void {
    this._setApp();
    this._setScoutMiddleware();
    this._setViews();
    this._setViewEngine();
    this._serveHomePage();
    this._listen();
  }

  private _setApp(): void {
    this._app = express();
  }

  private _listen(): void {
    const port: number = this._serverConfigService.getPort();

    if (!_.isNil(this._app)) {
      this._app.listen(port, (): void => {
        this._loggerService.log({
          context: this._serviceName,
          message: this._chalkService.text(
            `listening on port: ${this._chalkService.value(port)}`
          ),
        });
      });
    }
  }

  private _setScoutMiddleware(): void {
    if (!_.isNil(this._app)) {
      if (this._appConfigService.isProduction()) {
        this._app.use(scout.expressMiddleware());
      }
    }
  }

  private _setViews(): void {
    if (!_.isNil(this._app)) {
      this._app.set(`views`, `${path}/src/views`);
    }
  }

  private _setViewEngine(): void {
    if (!_.isNil(this._app)) {
      this._app.set(`view engine`, `pug`);
    }
  }

  private _serveHomePage(): void {
    if (!_.isNil(this._app)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._app.get(`/`, (_req: any, res: any): any => {
        return res.render(`home/home`);
      });
    }
  }
}
