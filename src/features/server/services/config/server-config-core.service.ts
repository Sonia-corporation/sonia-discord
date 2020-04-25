import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { IServerConfig } from "../../interfaces/server-config";

export class ServerConfigCoreService extends AbstractService
  implements IServerConfig {
  private static _instance: ServerConfigCoreService;

  public static getInstance(): ServerConfigCoreService {
    if (_.isNil(ServerConfigCoreService._instance)) {
      ServerConfigCoreService._instance = new ServerConfigCoreService();
    }

    return ServerConfigCoreService._instance;
  }

  public port = 3001;

  public constructor() {
    super(ServiceNameEnum.SERVER_CONFIG_CORE_SERVICE);
  }
}
