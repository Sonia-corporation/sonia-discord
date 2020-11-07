import scout from "@scout_apm/scout-apm";
import { path } from "app-root-path";
import express, { Express } from "express";
import _ from "lodash";
import { AbstractService } from "../../../classes/services/abstract.service";
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
    const port: number = ServerConfigService.getInstance().getPort();

    if (_.isNil(this._app)) {
      return;
    }

    this._app.listen(port, (): void => {
      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `listening on port: ${ChalkService.getInstance().value(port)}`
        ),
      });
    });
  }

  private _setScoutMiddleware(): void {
    if (_.isNil(this._app)) {
      return;
    }

    if (AppConfigService.getInstance().isProduction()) {
      this._app.use(scout.expressMiddleware());
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
      this._app.get(`/`, (_req: any, res: any): any => res.render(`home/home`));
    }
  }
}
