import { ServerConfigCoreService } from './server-config-core.service';
import { ServerConfigService } from './server-config.service';
import { AbstractConfigService } from '../../../../classes/services/abstract-config.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../types/partial-nested';
import { ConfigService } from '../../../config/services/config.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { getEnvironmentPort } from '../../../node/functions/get-environment-port';
import { ServerConfigValueNameEnum } from '../../enums/server-config-value-name.enum';
import { IServerConfig } from '../../interfaces/server-config';
import _ from 'lodash';

export class ServerConfigMutatorService extends AbstractConfigService<IServerConfig> {
  private static _instance: ServerConfigMutatorService;

  public static getInstance(config?: Readonly<IPartialNested<IServerConfig>>): ServerConfigMutatorService {
    if (_.isNil(ServerConfigMutatorService._instance)) {
      ServerConfigMutatorService._instance = new ServerConfigMutatorService(config);
    }

    return ServerConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IServerConfig>>) {
    super(ServiceNameEnum.SERVER_CONFIG_MUTATOR_SERVICE, config);
  }

  public init(): ServerConfigMutatorService {
    this._setPort();

    return this;
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    ServerConfigCoreService.getInstance();
    ServerConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IServerConfig>>): void {
    if (!_.isNil(config)) {
      this.updatePort(config.port);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updatePort(port?: Readonly<number>): void {
    ServerConfigCoreService.getInstance().port = ConfigService.getInstance().getUpdatedNumber({
      context: this._serviceName,
      newValue: port,
      oldValue: ServerConfigService.getInstance().getPort(),
      valueName: ServerConfigValueNameEnum.PORT,
    });
  }

  private _setPort(): void {
    const environmentPort: number | null = getEnvironmentPort();

    if (!_.isNil(environmentPort)) {
      this.updatePort(environmentPort);
    }
  }
}
