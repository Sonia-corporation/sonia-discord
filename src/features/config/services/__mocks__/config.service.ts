import _ from "lodash";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { LoggerService } from "../../../logger/services/logger.service";
import { IConfigUpdateBoolean } from "../../interfaces/config-update-boolean";
import { IConfigUpdateNumber } from "../../interfaces/config-update-number";
import { IConfigUpdateString } from "../../interfaces/config-update-string";

export class ConfigService {
  private static _instance: ConfigService;

  public static getInstance(): ConfigService {
    if (_.isNil(ConfigService._instance)) {
      ConfigService._instance = new ConfigService();
    }

    return ConfigService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();

  public getUpdatedNumber(
    configUpdateNumber: Readonly<IConfigUpdateNumber>
  ): number {
    if (_.isNumber(configUpdateNumber.newValue)) {
      this._loggerService.log({
        context: configUpdateNumber.context,
        message: `${configUpdateNumber.valueName} updated to: ${configUpdateNumber.newValue}`,
      });

      return configUpdateNumber.newValue;
    }

    return configUpdateNumber.oldValue;
  }

  public getUpdatedString(
    configUpdateString: Readonly<IConfigUpdateString>
  ): string {
    if (_.isString(configUpdateString.newValue)) {
      let message = `${configUpdateString.valueName} updated`;

      if (_.isEqual(configUpdateString.isValueHidden, true)) {
        message = this._loggerService.getHiddenValueUpdate(
          `${message} to: `,
          true
        );
      } else {
        if (!_.isEqual(configUpdateString.isValueDisplay, false)) {
          message = `${message} to: ${wrapInQuotes(
            configUpdateString.newValue
          )}`;
        }
      }

      this._loggerService.log({
        context: configUpdateString.context,
        message: message,
      });

      return configUpdateString.newValue;
    }

    return configUpdateString.oldValue;
  }

  public getUpdatedBoolean(
    configUpdateString: Readonly<IConfigUpdateBoolean>
  ): boolean {
    if (_.isBoolean(configUpdateString.newValue)) {
      this._loggerService.log({
        context: configUpdateString.context,
        message: `${configUpdateString.valueName} updated to: ${configUpdateString.newValue}`,
      });

      return configUpdateString.newValue;
    }

    return configUpdateString.oldValue;
  }
}
