import { Store } from "@datorama/akita";
import { ServiceNameEnum } from "../enums/service-name.enum";
import { CoreEventService } from "../features/core/services/core-event.service";

/**
 * @description
 * Log the creation of the service
 * Used for Store only
 */
export abstract class AbstractStoreService<T> extends Store<T> {
  protected readonly _serviceName: ServiceNameEnum;
  private readonly _coreEventService: CoreEventService = CoreEventService.getInstance();

  protected constructor(
    serviceName: Readonly<ServiceNameEnum>,
    storeState: Readonly<T>
  ) {
    super(storeState);
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    this._coreEventService.notifyServiceCreated(this._serviceName);
  }
}
