import _ from 'lodash';
import { TimeService } from '../time/time-service';
import {
  chalkContext,
  chalkDebug,
  chalkError,
  chalkHint,
  chalkLog,
  chalkSuccess,
  chalkText,
  chalkValue,
  chalkWarning
} from './chalk';
import { LoggerLogTypeEnum } from './enums/logger-log-type.enum';
import { LOGGER_CONFIG } from './logger-config';

export class LoggerService {
  private static _instance: LoggerService;

  public static getInstance(): LoggerService {
    if (_.isNil(LoggerService._instance)) {
      LoggerService._instance = new LoggerService();
    }

    return LoggerService._instance;
  }

  private readonly _timeService = TimeService.getInstance();
  private readonly _logPrefix = '● ';

  public error(message: Readonly<string>): void;
  public error(context: Readonly<string>, message: Readonly<string>): void;
  public error(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === 'debug' || LOGGER_CONFIG.level === 'log' || LOGGER_CONFIG.level === 'success' || LOGGER_CONFIG.level === 'warning' || LOGGER_CONFIG.level === 'error') {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.ERROR)}${arguments[ 0 ]}`);
        } else if (_.isEqual(numberOfArguments, 2)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.ERROR)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public warning(message: Readonly<string>): void;
  public warning(context: Readonly<string>, message: Readonly<string>): void;
  public warning(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === 'debug' || LOGGER_CONFIG.level === 'log' || LOGGER_CONFIG.level === 'success' || LOGGER_CONFIG.level === 'warning') {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.WARNING)}${arguments[ 0 ]}`);
        } else if (_.isEqual(numberOfArguments, 2)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.WARNING)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public success(message: Readonly<string>): void;
  public success(context: Readonly<string>, message: Readonly<string>): void;
  public success(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === 'debug' || LOGGER_CONFIG.level === 'log' || LOGGER_CONFIG.level === 'success') {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.SUCCESS)}${arguments[ 0 ]}`);
        } else if (_.isEqual(numberOfArguments, 2)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.SUCCESS)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public log(message: Readonly<string>): void;
  public log(context: Readonly<string>, message: Readonly<string>): void;
  public log(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === 'debug' || LOGGER_CONFIG.level === 'log') {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.LOG)}${arguments[ 0 ]}`);
        } else if (_.isEqual(numberOfArguments, 2)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.LOG)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public debug(message: Readonly<string>): void;
  public debug(context: Readonly<string>, message: Readonly<string>): void;
  public debug(): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      if (LOGGER_CONFIG.level === 'debug') {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${arguments[ 0 ]}`);
        } else if (_.isEqual(numberOfArguments, 2)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public getStringArray(array: Readonly<string>[]): string {
    return `[ ${_.join(_.map(array, (value) => `"${value}"`), ', ')} ]`;
  }

  public getValueUpdateWithHint(
    text: Readonly<string>,
    value: Readonly<string>,
    hint: Readonly<string>
  ): string {
    return `${chalkText(text)}${chalkValue(value)}${chalkHint(hint)}`;
  }

  public getHiddenValueUpdate(
    text: Readonly<string>,
    isStringValue = false
  ): string {
    let value = '********';

    if (_.isEqual(isStringValue, true)) {
      value = `"${value}"`;
    }

    return this.getValueUpdateWithHint(text, value, ' (hidden)');
  }

  private _context(name: Readonly<string>): string {
    return chalkContext(`[${name}][${this._timeService.now('HH:mm:ss:SSS')}] `);
  }

  private _getLogTypePrefix(logType: Readonly<LoggerLogTypeEnum>): string {
    if (logType === LoggerLogTypeEnum.ERROR) {
      return chalkError(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.WARNING) {
      return chalkWarning(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.SUCCESS) {
      return chalkSuccess(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.LOG) {
      return chalkLog(this._logPrefix);
    } else if (logType === LoggerLogTypeEnum.DEBUG) {
      return chalkDebug(this._logPrefix);
    }

    return chalkDebug(this._logPrefix);
  }
}
