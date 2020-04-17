import { ServiceNameEnum } from "../enums/service-name.enum";
import { CoreEventService } from "../features/core/services/core-event.service";

/**
 * @description
 * Log the creation of the service
 */
export abstract class AbstractService {
  protected readonly _serviceName: ServiceNameEnum;
  private readonly _coreEventService: CoreEventService = CoreEventService.getInstance();

  protected constructor(serviceName: Readonly<ServiceNameEnum>) {
    this._serviceName = serviceName;

    this.notifyServiceCreated();
  }

  private notifyServiceCreated(): void {
    this._coreEventService.notifyServiceCreated(this._serviceName);
  }
}
