import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IServerConfig } from '../../interfaces/server-config';
import _ from 'lodash';

const DEFAULT_PORT = 3001;

export class ServerConfigCoreService extends AbstractService implements IServerConfig {
  private static _instance: ServerConfigCoreService;

  public static getInstance(): ServerConfigCoreService {
    if (_.isNil(ServerConfigCoreService._instance)) {
      ServerConfigCoreService._instance = new ServerConfigCoreService();
    }

    return ServerConfigCoreService._instance;
  }

  public port = DEFAULT_PORT;

  public constructor() {
    super(ServiceNameEnum.SERVER_CONFIG_CORE_SERVICE);
  }
}
