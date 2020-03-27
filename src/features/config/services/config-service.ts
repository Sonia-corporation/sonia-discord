import _ from 'lodash';
import { ChalkService } from '../../logger/services/chalk-service';
import { LoggerService } from '../../logger/services/logger-service';
import { IConfigUpdateNumber } from '../interfaces/config-update-number';

export class ConfigService {
  private static _instance: ConfigService;

  public static getInstance(): ConfigService {
    if (_.isNil(ConfigService._instance)) {
      ConfigService._instance = new ConfigService();
    }

    return ConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();

  public getUpdatedNumber(configUpdateNumber: Readonly<IConfigUpdateNumber>): number {
    if (_.isNumber(configUpdateNumber.newValue)) {
      this._loggerService.log({
        context: configUpdateNumber.context,
        message: this._chalkService.text(`${configUpdateNumber.valueName} updated to: ${this._chalkService.value(configUpdateNumber.newValue)}`)
      });

      return configUpdateNumber.newValue;
    }

    return configUpdateNumber.oldValue;
  }
}
