import { ConfigService } from "../features/config/services/config-service";
import { ChalkService } from "../features/logger/services/chalk-service";
import { LoggerService } from "../features/logger/services/logger-service";
import { PartialNested } from "../types/partial-nested";

export abstract class AbstractConfigService<C> {
  protected readonly _loggerService = LoggerService.getInstance();
  protected readonly _chalkService = ChalkService.getInstance();
  protected readonly _configService = ConfigService.getInstance();
  protected abstract readonly _className: string;

  protected constructor(config?: Readonly<PartialNested<C>>) {
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

  public abstract updateConfig(config?: Readonly<PartialNested<C>>): void;
}
