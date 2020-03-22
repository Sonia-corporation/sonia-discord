import _ from 'lodash';
import { Time } from '../time/time';
import {
  chalkContext,
  chalkDebug,
  chalkError,
  chalkLog,
  chalkSuccess,
  chalkText,
  chalkValue,
  chalkWarning
} from './chalk';
import { LoggerConfigLevelEnum } from './enums/logger-config-level.enum';
import { LoggerLogTypeEnum } from './enums/logger-log-type.enum';
import { ILoggerConfig } from './interfaces/logger-config';

export class Logger {
  private static _instance: Logger;

  public static getInstance(config?: Readonly<Partial<ILoggerConfig>>): Logger {
    if (_.isNil(Logger._instance)) {
      Logger._instance = new Logger(config);
    }

    return Logger._instance;
  }

  private readonly _time = Time.getInstance();
  private readonly _config: ILoggerConfig = {
    isEnabled: false,
    level: LoggerConfigLevelEnum.DEBUG
  };
  private readonly _logPrefix = '● ';
  private readonly _className = 'Logger';

  public constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateEnabledState(config);
      this.updateLevel(config);

      this.debug(this._className, chalkText(`configuration updated`));
    }
  }

  public updateEnabledState(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isBoolean(config.isEnabled)) {
      this._config.isEnabled = config.isEnabled;

      this.log(this._className, chalkText(`enabled state updated to: ${chalkValue(this._config.isEnabled)}`));
    }
  }

  public updateLevel(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isString(config.level)) {
      this._config.level = config.level;

      this.log(this._className, chalkText(`level updated to: ${chalkValue(`"${this._config.level}"`)}`));
    }
  }

  public error(message: Readonly<string>): void;
  public error(context: Readonly<string>, message: Readonly<string>): void;
  public error(): void {
    if (_.isEqual(this._config.isEnabled, true)) {
      if (this._config.level === 'debug' || this._config.level === 'log' || this._config.level === 'success' || this._config.level === 'warning' || this._config.level === 'error') {
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
    if (_.isEqual(this._config.isEnabled, true)) {
      if (this._config.level === 'debug' || this._config.level === 'log' || this._config.level === 'success' || this._config.level === 'warning') {
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
    if (_.isEqual(this._config.isEnabled, true)) {
      if (this._config.level === 'debug' || this._config.level === 'log' || this._config.level === 'success') {
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
    if (_.isEqual(this._config.isEnabled, true)) {
      if (this._config.level === 'debug' || this._config.level === 'log') {
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
    if (_.isEqual(this._config.isEnabled, true)) {
      if (this._config.level === 'debug') {
        const numberOfArguments = _.size(arguments);

        if (_.isEqual(numberOfArguments, 1)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${arguments[ 0 ]}`);
        } else if (_.isEqual(numberOfArguments, 2)) {
          console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
        }
      }
    }
  }

  public getStringArray(array: string[]): string {
    return `[ ${_.join(_.map(array, (value) => `"${value}"`), ', ')} ]`;
  }

  private _context(name: Readonly<string>): string {
    return chalkContext(`[${name}][${this._time.now('HH:mm:ss:SSS')}] `);
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
