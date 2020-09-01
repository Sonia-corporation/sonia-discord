import { Store } from "@datorama/akita";
import { ServiceNameEnum } from "../../enums/service-name.enum";
import { CoreEventService } from "../../features/core/services/core-event.service";
import { IObject } from "../../types/object";

/**
 * @description
 * Log the creation of the service
 * Used for Store only
 */
export abstract class AbstractStoreService<T = IObject> extends Store<T> {
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(
    serviceName: Readonly<ServiceNameEnum>,
    storeState: Readonly<T>
  ) {
    super(storeState);
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    CoreEventService.getInstance().notifyServiceCreated(this._serviceName);
  }
}
