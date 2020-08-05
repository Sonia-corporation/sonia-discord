import { EntityStore } from "@datorama/akita";
import { ServiceNameEnum } from "../enums/service-name.enum";
import { CoreEventService } from "../features/core/services/core-event.service";

/**
 * @description
 * Log the creation of the service
 * Used for Entity Store only
 */
export abstract class AbstractEntityStoreService<T> extends EntityStore<T> {
  protected readonly _serviceName: ServiceNameEnum;
  private readonly _coreEventService: CoreEventService = CoreEventService.getInstance();

  protected constructor(
    serviceName: Readonly<ServiceNameEnum>,
    storeState?: Readonly<T | undefined>
  ) {
    super(storeState);
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    this._coreEventService.notifyServiceCreated(this._serviceName);
  }
}
