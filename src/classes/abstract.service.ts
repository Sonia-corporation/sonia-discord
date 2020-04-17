import { ServiceNameEnum } from "./enums/service-name.enum";
import { LoggerService } from "../features/logger/services/logger.service";

/**
 * @description
 * Log the creation of the service
 */
export abstract class AbstractService {
  protected readonly _loggerService: LoggerService = LoggerService.getInstance();
  protected readonly _serviceName: ServiceNameEnum;

  protected constructor(serviceName: Readonly<ServiceNameEnum>) {
    this._serviceName = serviceName;

    this._loggerService.serviceCreated({
      service: this._serviceName,
    });
  }
}
