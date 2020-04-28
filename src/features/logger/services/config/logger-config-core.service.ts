import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";

export class LoggerConfigCoreService extends AbstractService
  implements ILoggerConfig {
  private static _instance: LoggerConfigCoreService;

  public static getInstance(): LoggerConfigCoreService {
    if (_.isNil(LoggerConfigCoreService._instance)) {
      LoggerConfigCoreService._instance = new LoggerConfigCoreService();
    }

    return LoggerConfigCoreService._instance;
  }

  public isEnabled = true;
  public level = LoggerConfigLevelEnum.DEBUG;

  public constructor() {
    super(ServiceNameEnum.LOGGER_CONFIG_CORE_SERVICE);
  }
}
