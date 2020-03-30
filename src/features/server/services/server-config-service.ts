import _ from 'lodash';
import { AbstractConfigService } from '../../../classes/abstract-config-service';
import { PartialNested } from '../../../types/partial-nested';
import { getEnvironmentPort } from '../../node/functions/get-environment-port';
import { SERVER_CONFIG } from '../constants/server-config';
import { IServerConfig } from '../interfaces/server-config';

export class ServerConfigService extends AbstractConfigService<IServerConfig> {
  private static _instance: ServerConfigService;

  public static getInstance(config?: Readonly<PartialNested<IServerConfig>>): ServerConfigService {
    if (_.isNil(ServerConfigService._instance)) {
      ServerConfigService._instance = new ServerConfigService(config);
    }

    return ServerConfigService._instance;
  }

  protected readonly _className = `ServerConfigService`;

  protected constructor(config?: Readonly<PartialNested<IServerConfig>>) {
    super(config);
  }

  // @todo add coverage
  public init(): ServerConfigService {
    this._definePort();

    return this;
  }

  // @todo add coverage
  public updateConfig(config?: Readonly<PartialNested<IServerConfig>>): void {
    if (!_.isNil(config)) {
      this.updatePort(config.port);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }

  public getConfig(): IServerConfig {
    return SERVER_CONFIG;
  }

  public getPort(): number {
    return SERVER_CONFIG.port;
  }

  public updatePort(port?: Readonly<number>): void {
    SERVER_CONFIG.port = this._configService.getUpdatedNumber({
      context: this._className,
      newValue: port,
      oldValue: SERVER_CONFIG.port,
      valueName: `port`
    });
  }

  private _definePort(): void {
    const environmentPort: number | null = getEnvironmentPort();

    if (!_.isNil(environmentPort)) {
      this.updatePort(environmentPort);
    }
  }
}
