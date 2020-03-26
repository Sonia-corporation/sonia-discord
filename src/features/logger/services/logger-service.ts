import _ from 'lodash';
import { wrapInQuotes } from '../../../functions/wrap-in-quotes';
import { TimeService } from '../../time/services/time-service';
import { LOGGER_CONFIG } from '../constants/logger-config';
import { LoggerConfigLevelValueEnum } from '../enums/logger-config-level-value.enum';
import { LoggerLogTypeEnum } from '../enums/logger-log-type.enum';
import { ILoggerLog } from '../interfaces/logger-log';
import { ILoggerLogInternal } from '../interfaces/logger-log-internal';
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

  public error(loggerLog: Readonly<ILoggerLog>): void {
    if (this._isErrorEnabled()) {
      this._log({
        loggerLog,
        loggerLogType: LoggerLogTypeEnum.ERROR
      });
    }
  }

  public warning(loggerLog: Readonly<ILoggerLog>): void {
    if (this._isWarningEnabled()) {
      this._log({
        loggerLog,
        loggerLogType: LoggerLogTypeEnum.WARNING
      });
    }
  }

  public success(loggerLog: Readonly<ILoggerLog>): void {
    if (this._isSuccessEnabled()) {
      this._log({
        loggerLog,
        loggerLogType: LoggerLogTypeEnum.SUCCESS
      });
    }
  }

  public log(loggerLog: Readonly<ILoggerLog>): void {
    if (this._isLogEnabled()) {
      this._log({
        loggerLog,
        loggerLogType: LoggerLogTypeEnum.LOG
      });
    }
  }

  public debug(loggerLog: Readonly<ILoggerLog>): void {
    if (this._isDebugEnabled()) {
      this._log({
        loggerLog,
        loggerLogType: LoggerLogTypeEnum.DEBUG
      });
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

  private _log(loggerLogInternal: Readonly<ILoggerLogInternal>): void {
    if (_.isEqual(LOGGER_CONFIG.isEnabled, true)) {
      const logTypePrefix: string = this._getLogTypePrefix(loggerLogInternal.loggerLogType);

      if (_.isString(loggerLogInternal.loggerLog.context) && !_.isEmpty(loggerLogInternal.loggerLog.context)) {
        console.log(`${logTypePrefix}${this._context(loggerLogInternal.loggerLog.context, loggerLogInternal.loggerLog.extendedContext)}${loggerLogInternal.loggerLog.message}`);
      } else {
        console.log(`${logTypePrefix}${loggerLogInternal.loggerLog.message}`);
      }
    }
  }

  private _context(
    name: Readonly<string>,
    extendedContext: Readonly<boolean> = false
  ): string {
    let message = `[${name}][${this._timeService.now(`HH:mm:ss:SSS`)}]`;

    if (_.isEqual(extendedContext, false) || !_.isBoolean(extendedContext)) {
      message = `${message} `;
    }

    return this._chalkService.context(message);
  }

  private _getLogTypePrefix(logType: Readonly<LoggerLogTypeEnum>): string {
    return this._chalkService[ logType ](this._logPrefix);
  }

  private _isErrorEnabled(): boolean {
    return _.gte(LoggerConfigLevelValueEnum[ LOGGER_CONFIG.level ], 0);
  }

  private _isWarningEnabled(): boolean {
    return _.gte(LoggerConfigLevelValueEnum[ LOGGER_CONFIG.level ], 1);
  }

  private _isSuccessEnabled(): boolean {
    return _.gte(LoggerConfigLevelValueEnum[ LOGGER_CONFIG.level ], 2);
  }

  private _isLogEnabled(): boolean {
    return _.gte(LoggerConfigLevelValueEnum[ LOGGER_CONFIG.level ], 3);
  }

  private _isDebugEnabled(): boolean {
    return _.gte(LoggerConfigLevelValueEnum[ LOGGER_CONFIG.level ], 4);
  }
}
