import { ServiceNameEnum } from '../../enums/service-name.enum';
import { CoreEventService } from '../../features/core/services/core-event.service';

/**
 * @description
 * Log the creation of the service
 */
export abstract class AbstractService {
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(serviceName: Readonly<ServiceNameEnum>) {
    this._serviceName = serviceName;

    this._notifyServiceCreated();
  }

  private _notifyServiceCreated(): void {
    CoreEventService.getInstance().notifyServiceCreated(this._serviceName);
  }
}
