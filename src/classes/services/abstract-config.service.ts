import { AbstractService } from './abstract.service';
import { ServiceNameEnum } from '../../enums/service-name.enum';
import { IPartialNested } from '../../types/partial-nested';

export abstract class AbstractConfigService<TConfig> extends AbstractService {
  protected constructor(serviceName: ServiceNameEnum, config?: IPartialNested<TConfig>) {
    super(serviceName);
    this.preUpdateConfig();
    this.updateConfig(config);
    this.postUpdateConfig();
  }

  /**
   * @description
   * This method should be used to perform actions before the update of the config.
   * This is quite handy when you want to set up a default configuration just before the config override it.
   */
  public preUpdateConfig(): void {
    // Avoid lint error :)
  }

  /**
   * @description
   * This method should be used to perform actions after the update of the config.
   * This is quite handy when you want to set up a default configuration just after the config override it.
   */
  public postUpdateConfig(): void {
    // Avoid lint error :)
  }

  public abstract updateConfig(config?: IPartialNested<TConfig>): void;
}
