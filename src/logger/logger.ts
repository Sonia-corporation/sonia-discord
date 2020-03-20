import _ from 'lodash';
import { Time } from '../time/time';
import {
  chalkContext,
  chalkDebug,
  chalkError,
  chalkLog,
  chalkSuccess,
  chalkText,
  chalkValue
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

  private readonly _time: Time;
  private readonly _config: ILoggerConfig;
  private readonly _logPrefix = '● ';

  public constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    this._time = Time.getInstance();
    this._config = {
      level: LoggerConfigLevelEnum.OFF
    };

    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateLevel(config);

      this.debug(this.constructor.name, chalkText(`configuration updated`));
    }
  }

  public updateLevel(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isString(config.level)) {
      this._config.level = config.level;

      this.log(this.constructor.name, chalkText(`level updated to: ${chalkValue(`"${config.level}"`)}`));
    }
  }

  public error(message: Readonly<string>): void;
  public error(context: Readonly<string>, message: Readonly<string>): void;
  public error(): void {
    if (this._config.level === 'debug' || this._config.level === 'log' || this._config.level === 'success' || this._config.level === 'error') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.ERROR)}${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.ERROR)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  public success(message: Readonly<string>): void;
  public success(context: Readonly<string>, message: Readonly<string>): void;
  public success(): void {
    if (this._config.level === 'debug' || this._config.level === 'log' || this._config.level === 'success') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.SUCCESS)}${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.SUCCESS)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  public log(message: Readonly<string>): void;
  public log(context: Readonly<string>, message: Readonly<string>): void;
  public log(): void {
    if (this._config.level === 'debug' || this._config.level === 'log') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.LOG)}${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.LOG)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  public debug(message: Readonly<string>): void;
  public debug(context: Readonly<string>, message: Readonly<string>): void;
  public debug(): void {
    if (this._config.level === 'debug') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.log(`${this._getLogTypePrefix(LoggerLogTypeEnum.DEBUG)}${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  private _context(name: Readonly<string>): string {
    return chalkContext(`[${name}][${this._time.now('HH:mm:ss:SSS')}] `);
  }

  private _getLogTypePrefix(logType: LoggerLogTypeEnum): string {
    if (logType === LoggerLogTypeEnum.ERROR) {
      return chalkError(this._logPrefix);
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
