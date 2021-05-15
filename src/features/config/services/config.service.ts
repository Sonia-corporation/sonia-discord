import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../functions/formatters/wrap-in-quotes';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { TimeService } from '../../time/services/time.service';
import { IConfigUpdateArray } from '../interfaces/config-update-array';
import { IConfigUpdateBoolean } from '../interfaces/config-update-boolean';
import { IConfigUpdateDateInternal } from '../interfaces/config-update-date-internal';
import { IConfigUpdateDate } from '../interfaces/config-update-date';
import { IConfigUpdateNumber } from '../interfaces/config-update-number';
import { IConfigUpdateStringInternal } from '../interfaces/config-update-string-internal';
import { IConfigUpdateStringOrArrayInternal } from '../interfaces/config-update-string-or-array-internal';
import { IConfigUpdateStringOrArray } from '../interfaces/config-update-string-or-array';
import { IConfigUpdateString } from '../interfaces/config-update-string';
import _ from 'lodash';

export class ConfigService extends AbstractService {
  private static _instance: ConfigService;

  public static getInstance(): ConfigService {
    if (_.isNil(ConfigService._instance)) {
      ConfigService._instance = new ConfigService();
    }

    return ConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.CONFIG_SERVICE);
  }

  public getUpdatedNumber({ context, newValue, oldValue, valueName }: Readonly<IConfigUpdateNumber>): number {
    if (_.isNumber(newValue)) {
      LoggerService.getInstance().log({
        context,
        message: ChalkService.getInstance().text(
          `${valueName} updated to: ${ChalkService.getInstance().value(newValue)}`
        ),
      });

      return newValue;
    }

    return oldValue;
  }

  public getUpdatedString<T = string>(configUpdateString: Readonly<IConfigUpdateString<T>>): T {
    if (_.isString(configUpdateString.newValue)) {
      LoggerService.getInstance().log({
        context: configUpdateString.context,
        message: this._getUpdatedStringMessage(configUpdateString),
      });

      return configUpdateString.newValue;
    }

    return configUpdateString.oldValue;
  }

  public getUpdatedDate<T = string>(configUpdateDate: Readonly<IConfigUpdateDate<T>>): T {
    if (_.isString(configUpdateDate.newValue)) {
      LoggerService.getInstance().log({
        context: configUpdateDate.context,
        message: this._getUpdatedDateMessage(configUpdateDate),
      });

      return configUpdateDate.newValue;
    }

    return configUpdateDate.oldValue;
  }

  public getUpdatedStringOrArray<T = string>(configUpdateStringOrArray: Readonly<IConfigUpdateStringOrArray<T>>): T {
    if (_.isString(configUpdateStringOrArray.newValue)) {
      LoggerService.getInstance().log({
        context: configUpdateStringOrArray.context,
        message: this._getUpdatedStringMessage(configUpdateStringOrArray),
      });

      return configUpdateStringOrArray.newValue;
    } else if (_.isArray(configUpdateStringOrArray.newValue)) {
      LoggerService.getInstance().log({
        context: configUpdateStringOrArray.context,
        message: this._getUpdatedStringOrArrayMessage(configUpdateStringOrArray),
      });

      return configUpdateStringOrArray.newValue;
    }

    return configUpdateStringOrArray.oldValue;
  }

  public getUpdatedArray<TValue = string>(configUpdateArray: Readonly<IConfigUpdateArray<TValue>>): TValue[] {
    if (_.isArray(configUpdateArray.newValue)) {
      LoggerService.getInstance().log({
        context: configUpdateArray.context,
        message: this._getUpdatedArrayMessage(configUpdateArray),
      });

      return configUpdateArray.newValue;
    }

    return configUpdateArray.oldValue;
  }

  public getUpdatedBoolean({
    context,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    newValue,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    oldValue,
    valueName,
  }: Readonly<IConfigUpdateBoolean>): boolean {
    if (_.isBoolean(newValue)) {
      LoggerService.getInstance().log({
        context,
        message: ChalkService.getInstance().text(
          `${valueName} updated to: ${ChalkService.getInstance().value(newValue)}`
        ),
      });

      return newValue;
    }

    return oldValue;
  }

  private _getUpdatedStringMessage<T = string>({
    isValueDisplay,
    isValueHidden,
    newValue,
    valueName,
  }: Readonly<IConfigUpdateStringInternal<T>>): string {
    let message = `${valueName} updated`;

    if (_.isEqual(isValueHidden, true)) {
      message = LoggerService.getInstance().getHiddenValueUpdate(`${message} to: `, true);
    } else {
      if (!_.isEqual(isValueDisplay, false)) {
        message = ChalkService.getInstance().text(
          `${message} to: ${ChalkService.getInstance().value(wrapInQuotes<T>(newValue))}`
        );
      } else {
        message = ChalkService.getInstance().text(message);
      }
    }

    return message;
  }

  private _getUpdatedStringOrArrayMessage<T = string>({
    valueName,
    isValueHidden,
    isValueDisplay,
    newValue,
  }: Readonly<IConfigUpdateStringOrArrayInternal<T>>): string {
    let message = `${valueName} updated`;

    if (_.isEqual(isValueHidden, true)) {
      message = LoggerService.getInstance().getHiddenValueArrayUpdate(`${message} to: `, true);
    } else {
      if (!_.isEqual(isValueDisplay, false) && _.isArray(newValue)) {
        message = ChalkService.getInstance().text(
          `${message} to: ${ChalkService.getInstance().value(LoggerService.getInstance().getStringArray<T>(newValue))}`
        );
      } else {
        message = ChalkService.getInstance().text(message);
      }
    }

    return message;
  }

  private _getUpdatedArrayMessage<TValue = string>({
    valueName,
    isValueHidden,
    isValueDisplay,
    newValue,
  }: Readonly<IConfigUpdateArray<TValue>>): string {
    let message = `${valueName} updated`;

    if (_.isEqual(isValueHidden, true)) {
      message = LoggerService.getInstance().getHiddenValueArrayUpdate(`${message} to: `, true);
    } else {
      if (!_.isEqual(isValueDisplay, false) && _.isArray(newValue)) {
        message = ChalkService.getInstance().text(
          `${message} to: ${ChalkService.getInstance().value(
            LoggerService.getInstance().getStringArray<TValue>(newValue)
          )}`
        );
      } else {
        message = ChalkService.getInstance().text(message);
      }
    }

    return message;
  }

  private _getUpdatedDateMessage<T = string>({
    valueName,
    isValueHidden,
    isValueDisplay,
    newValue,
  }: Readonly<IConfigUpdateDateInternal<T>>): string {
    let message = `${valueName} updated`;

    if (_.isEqual(isValueHidden, true)) {
      message = LoggerService.getInstance().getHiddenValueUpdate(`${message} to: `, true);
    } else {
      if (!_.isEqual(isValueDisplay, false)) {
        message = ChalkService.getInstance().text(
          `${message} to: ${ChalkService.getInstance().value(
            wrapInQuotes<T>(newValue)
          )} ${ChalkService.getInstance().hint(`(${TimeService.getInstance().fromNow<T>(newValue, false)})`)}`
        );
      } else {
        message = ChalkService.getInstance().text(message);
      }
    }

    return message;
  }
}
