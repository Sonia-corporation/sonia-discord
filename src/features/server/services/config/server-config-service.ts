import _ from "lodash";
import { IServerConfig } from "../../interfaces/server-config";
import { ServerConfigCoreService } from "./server-config-core-service";

export class ServerConfigService {
  private static _instance: ServerConfigService;

  public static getInstance(): ServerConfigService {
    if (_.isNil(ServerConfigService._instance)) {
      ServerConfigService._instance = new ServerConfigService();
    }

    return ServerConfigService._instance;
  }

  private readonly _serverConfigCoreService = ServerConfigCoreService.getInstance();

  public getConfig(): IServerConfig {
    return {
      port: this.getPort(),
    };
  }

  public getPort(): number {
    return this._serverConfigCoreService.port;
  }
}
