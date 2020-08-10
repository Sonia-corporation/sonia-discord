import { EntityStore, QueryEntity } from "@datorama/akita";
import { ServiceNameEnum } from "../enums/service-name.enum";
import { CoreEventService } from "../features/core/services/core-event.service";

/**
 * @description
 * Log the creation of the service
 * Used for Query Entity only
 */
export abstract class AbstractQueryEntityService<
  T extends EntityStore<TStoreState>,
  TStoreState
> extends QueryEntity<TStoreState> {
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(serviceName: Readonly<ServiceNameEnum>, store: T) {
    super(store);
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    CoreEventService.getInstance().notifyServiceCreated(this._serviceName);
  }
}
