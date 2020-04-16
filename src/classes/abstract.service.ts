import { LoggerService } from "../features/logger/services/logger.service";
import { ServiceNameEnum } from "./enums/service-name.enum";

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
