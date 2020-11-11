import { ServiceNameEnum } from '../../enums/service-name.enum';
import { CoreEventService } from '../../features/core/services/core-event.service';
import { EntityState, EntityStore } from '@datorama/akita';

/**
 * @description
 * Log the creation of the service
 * Used for Entity Store only
 */
export abstract class AbstractEntityStoreService<T extends EntityState> extends EntityStore<T> {
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(serviceName: Readonly<ServiceNameEnum>, storeState?: Readonly<T | undefined>) {
    super(storeState);
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    CoreEventService.getInstance().notifyServiceCreated(this._serviceName);
  }
}
