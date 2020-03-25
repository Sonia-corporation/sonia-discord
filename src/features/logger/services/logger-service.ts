import _ from 'lodash';
import { wrapInQuotes } from '../../../functions/wrap-in-quotes';
import { TimeService } from '../../time/services/time-service';
import { LOGGER_CONFIG } from '../constants/logger-config';
import { LoggerLogTypeEnum } from '../enums/logger-log-type.enum';
import { ChalkService } from './chalk-service';

export class LoggerService {
  private static _instance: LoggerService;

  public static getInstance(): LoggerService {
    if (_.isNil(LoggerService._instance)) {
      LoggerService._instance = new LoggerService();
    }

    return LoggerService._instance;
  }

  private readonly _timeService = TimeService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _logPrefix = `● `;

  public error(message: unknown): void;
  public error(context: Readonly<string>, message: unknown, extendedContext?: Readonly<boolean>): void;
  public error(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === `debug` || LOGGER_CONFIG.level === `log` || LOGGER_CONFIG.level === `success` || LOGGER_CONFIG.level === `warning` || LOGGER_CONFIG.level === `error`) {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.ERROR)}${arguments[ 0 ]}`);
        } else if (_.gt(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.ERROR)}${this._context(arguments[ 0 ], arguments[ 2 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public warning(message: unknown): void;
  public warning(context: Readonly<string>, message: unknown, extendedContext?: Readonly<boolean>): void;
  public warning(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === `debug` || LOGGER_CONFIG.level === `log` || LOGGER_CONFIG.level === `success` || LOGGER_CONFIG.level === `warning`) {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.WARNING)}${arguments[ 0 ]}`);
        } else if (_.gt(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.WARNING)}${this._context(arguments[ 0 ], arguments[ 2 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public success(message: unknown): void;
  public success(context: Readonly<string>, message: unknown, extendedContext?: Readonly<boolean>): void;
  public success(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === `debug` || LOGGER_CONFIG.level === `log` || LOGGER_CONFIG.level === `success`) {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.SUCCESS)}${arguments[ 0 ]}`);
        } else if (_.gt(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.SUCCESS)}${this._context(arguments[ 0 ], arguments[ 2 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public log(message: unknown): void;
  public log(context: Readonly<string>, message: unknown, extendedContext?: Readonly<boolean>): void;
  public log(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === `debug` || LOGGER_CONFIG.level === `log`) {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.LOG)}${arguments[ 0 ]}`);
        } else if (_.gt(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.LOG)}${this._context(arguments[ 0 ], arguments[ 2 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public debug(message: unknown): void;
  public debug(context: Readonly<string>, message: unknown, extendedContext?: Readonly<boolean>): void;
  public debug(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === `debug`) {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${arguments[ 0 ]}`);
        } else if (_.gt(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${this._context(arguments[ 0 ], arguments[ 2 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public getStringArray(array: Readonly<string>[]): string {
    return `[ ${_.join(_.map(array, (value: Readonly<string>): string => {
      return wrapInQuotes(value);
    }), `, `)} ]`;
  }

  public getValueUpdateWithHint(
    text: Readonly<string>,
    value: Readonly<string>,
    hint: Readonly<string>
  ): string {
    return `${this._chalkService.text(text)}${this._chalkService.value(value)}${this._chalkService.hint(hint)}`;
  }

  public getHiddenValueUpdate(
    text: Readonly<string>,
    isStringValue = false
  ): string {
    let value = `********`;

    if (_.isEqual(isStringValue, true)) {
      value = wrapInQuotes(value);
    }

    return this.getValueUpdateWithHint(text, value, ` (hidden)`);
  }

  public getSnowflakeContext(
    context: Readonly<string>,
    message: Readonly<string | null | undefined> | unknown
  ): string {
    return `${this._chalkService.context(`[${context}] `)}${this._chalkService.text(message)}`;
  }

  private _context(
    name: Readonly<string>,
    extendedContext: Readonly<boolean> = false
  ): string {
    let message = `[${name}][${this._timeService.now(`HH:mm:ss:SSS`)}]`;

    if (_.isEqual(extendedContext, false)) {
      message = `${message} `;
    }

    return this._chalkService.text(message);
  }

  private _getLogTypePrefix(logType: Readonly<LoggerLogTypeEnum>): string {
    if (logType === LoggerLogTypeEnum.ERROR) {
      return this._chalkService.error(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.WARNING) {
      return this._chalkService.warning(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.SUCCESS) {
      return this._chalkService.success(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.LOG) {
      return this._chalkService.log(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.DEBUG) {
      return this._chalkService.debug(this._logPrefix);
    }

    return this._chalkService.debug(this._logPrefix);
  }
}
