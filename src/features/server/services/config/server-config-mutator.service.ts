import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { LoggerService } from "../../../logger/services/logger.service";
import { getEnvironmentPort } from "../../../node/functions/get-environment-port";
import { ServerConfigValueNameEnum } from "../../enums/server-config-value-name.enum";
import { IServerConfig } from "../../interfaces/server-config";
import { ServerConfigCoreService } from "./server-config-core.service";
import { ServerConfigService } from "./server-config.service";

export class ServerConfigMutatorService extends AbstractConfigService<
  IServerConfig
> {
  private static _instance: ServerConfigMutatorService;

  public static getInstance(
    config?: Readonly<PartialNested<IServerConfig>>
  ): ServerConfigMutatorService {
    if (_.isNil(ServerConfigMutatorService._instance)) {
      ServerConfigMutatorService._instance = new ServerConfigMutatorService(
        config
      );
    }

    return ServerConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _serverConfigCoreService: ServerConfigCoreService = ServerConfigCoreService.getInstance();
  private _serverConfigService: ServerConfigService = ServerConfigService.getInstance();

  public constructor(config?: Readonly<PartialNested<IServerConfig>>) {
    super(ServiceNameEnum.SERVER_CONFIG_MUTATOR_SERVICE, config);
  }

  public init(): ServerConfigMutatorService {
    this._setPort();

    return this;
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._serverConfigCoreService = ServerConfigCoreService.getInstance();
    this._serverConfigService = ServerConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<PartialNested<IServerConfig>>): void {
    if (!_.isNil(config)) {
      this.updatePort(config.port);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updatePort(port?: Readonly<number>): void {
    this._serverConfigCoreService.port = this._configService.getUpdatedNumber({
      context: this._serviceName,
      newValue: port,
      oldValue: this._serverConfigService.getPort(),
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
