import { LoggerService } from "../features/logger/services/logger.service";

export abstract class AbstractService {
  protected readonly _loggerService: LoggerService = LoggerService.getInstance();
  protected readonly _serviceName: string;

  protected constructor(serviceName: Readonly<string>) {
    this._serviceName = serviceName;

    this._loggerService.serviceCreated({
      service: this._serviceName,
    });
  }
}
