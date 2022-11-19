import { ServiceNameEnum } from '../../enums/service-name.enum';
import { CoreEventService } from '../../features/core/services/core-event.service';
import { Store } from '@ngneat/elf';

/**
 * @description
 * Log the creation of the service
 * Used for Entity Store only
 */
export abstract class AbstractEntityStoreService {
  protected abstract readonly _store$: Store;
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(serviceName: ServiceNameEnum) {
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    CoreEventService.getInstance().notifyServiceCreated(this._serviceName);
  }
}
