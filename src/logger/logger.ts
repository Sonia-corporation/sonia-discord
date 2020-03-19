import _ from 'lodash';
import { Time } from '../time/time';
import {
  chalkContext,
  chalkCyan,
  chalkWhite
} from './chalk';
import { LoggerConfigLevelEnum } from './enums/logger-config-level.enum';
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

  public constructor(config?: Readonly<Partial<ILoggerConfig>>) {
    this._time = Time.getInstance();
    this._config = {
      level: LoggerConfigLevelEnum.OFF
    };

    if (!_.isNil(config) && _.isPlainObject(config)) {
      this.updateLevel(config);

      this.debug(this.constructor.name, chalkWhite(`configuration updated`));
    }
  }

  public updateLevel(config: Readonly<Partial<ILoggerConfig>>): void {
    if (_.isString(config.level)) {
      this._config.level = config.level;

      this.log(this.constructor.name, chalkWhite(`level updated to: ${chalkCyan(`"${config.level}"`)}`));
    }
  }

  public log(message: Readonly<string>): void;
  public log(context: Readonly<string>, message: Readonly<string>): void;
  public log(): void {
    if (this._config.level === 'debug' || this._config.level === 'log') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.log(`${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.log(`${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  public debug(message: Readonly<string>): void;
  public debug(context: Readonly<string>, message: Readonly<string>): void;
  public debug(): void {
    if (this._config.level === 'debug') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.debug(`${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.debug(`${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  public error(message: Readonly<string>): void;
  public error(context: Readonly<string>, message: Readonly<string>): void;
  public error(): void {
    if (this._config.level === 'debug' || this._config.level === 'log' || this._config.level === 'error') {
      const numberOfArguments = _.size(arguments);

      if (_.isEqual(numberOfArguments, 1)) {
        console.error(`${arguments[ 0 ]}`);
      } else if (_.isEqual(numberOfArguments, 2)) {
        console.error(`${this._context(arguments[ 0 ])}${arguments[ 1 ]}`);
      }
    }
  }

  private _context(name: Readonly<string>): string {
    return chalkContext(`[${name}][${this._time.now()}] `);
  }
}
