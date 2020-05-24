import { ConfigService } from "../features/config/services/config.service";
import { ChalkService } from "../features/logger/services/chalk/chalk.service";
import { PartialNested } from "../types/partial-nested";
import { AbstractService } from "./abstract.service";
import { ServiceNameEnum } from "../enums/service-name.enum";

export abstract class AbstractConfigService<TConfig> extends AbstractService {
  protected readonly _chalkService: ChalkService = ChalkService.getInstance();
  protected readonly _configService: ConfigService = ConfigService.getInstance();

  protected constructor(
    serviceName: Readonly<ServiceNameEnum>,
    config?: Readonly<PartialNested<TConfig>>
  ) {
    super(serviceName);
    this.preUpdateConfig();
    this.updateConfig(config);
    this.postUpdateConfig();
  }

  /**
   * @description
   * This method should be used to perform actions before the update of the config
   *
   * This is quite handy when you want to set up a default configuration
   * Just before the config override it
   */
  public preUpdateConfig(): void {
    // Avoid lint error :)
  }

  /**
   * @description
   * This method should be used to perform actions after the update of the config
   *
   * This is quite handy when you want to set up a default configuration
   * Just after the config override it
   */
  public postUpdateConfig(): void {
    // Avoid lint error :)
  }

  public abstract updateConfig(config?: Readonly<PartialNested<TConfig>>): void;
}
