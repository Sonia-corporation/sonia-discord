import _ from "lodash";
import { IServerConfig } from "../../interfaces/server-config";

export class ServerConfigCoreService implements IServerConfig {
  private static _instance: ServerConfigCoreService;

  public static getInstance(): ServerConfigCoreService {
    if (_.isNil(ServerConfigCoreService._instance)) {
      ServerConfigCoreService._instance = new ServerConfigCoreService();
    }

    return ServerConfigCoreService._instance;
  }

  public port = 3001;
}
