import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { LoggerService } from '../../../logger/services/logger.service';
import { IConfigUpdateBoolean } from '../../interfaces/config-update-boolean';
import { IConfigUpdateNumber } from '../../interfaces/config-update-number';
import { IConfigUpdateString } from '../../interfaces/config-update-string';
import _ from 'lodash';

export class ConfigService {
  private static _instance: ConfigService;

  public static getInstance(): ConfigService {
    if (_.isNil(ConfigService._instance)) {
      ConfigService._instance = new ConfigService();
    }

    return ConfigService._instance;
  }

  public getUpdatedNumber(configUpdateNumber: IConfigUpdateNumber): number {
    if (_.isNumber(configUpdateNumber.newValue)) {
      LoggerService.getInstance().log({
        context: configUpdateNumber.context,
        message: `${configUpdateNumber.valueName} updated to: ${_.toString(configUpdateNumber.newValue)}`,
      });

      return configUpdateNumber.newValue;
    }

    return configUpdateNumber.oldValue;
  }

  public getUpdatedString(configUpdateString: IConfigUpdateString): string {
    if (!_.isString(configUpdateString.newValue)) {
      return configUpdateString.oldValue;
    }

    let message = `${configUpdateString.valueName} updated`;

    if (_.isEqual(configUpdateString.isValueHidden, true)) {
      message = LoggerService.getInstance().getHiddenValueUpdate(`${message} to: `, true);
    } else {
      if (!_.isEqual(configUpdateString.isValueDisplay, false)) {
        message = `${message} to: ${wrapInQuotes(configUpdateString.newValue)}`;
      }
    }

    LoggerService.getInstance().log({
      context: configUpdateString.context,
      message,
    });

    return configUpdateString.newValue;
  }

  public getUpdatedBoolean(configUpdateString: IConfigUpdateBoolean): boolean {
    if (!_.isBoolean(configUpdateString.newValue)) {
      return configUpdateString.oldValue;
    }

    LoggerService.getInstance().log({
      context: configUpdateString.context,
      message: `${configUpdateString.valueName} updated to: ${_.toString(configUpdateString.newValue)}`,
    });

    return configUpdateString.newValue;
  }
}
