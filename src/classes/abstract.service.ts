import { SERVICE_CREATED_EVENT$ } from "../features/logger/constants/service-created-event";
import { ServiceNameEnum } from "./enums/service-name.enum";

/**
 * @description
 * Log the creation of the service
 */
export abstract class AbstractService {
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(serviceName: Readonly<ServiceNameEnum>) {
    this._serviceName = serviceName;

    this.notifyServiceCreated();
  }

  private notifyServiceCreated(): void {
    SERVICE_CREATED_EVENT$.next(this._serviceName);
  }
}
