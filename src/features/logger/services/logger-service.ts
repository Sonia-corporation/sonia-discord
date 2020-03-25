import _ from 'lodash';
import { wrapInQuotes } from '../../../functions/wrap-in-quotes';
import { TimeService } from '../../time/services/time-service';
import { LOGGER_CONFIG } from '../constants/logger-config';
import { LoggerConfigLevelEnum } from '../enums/logger-config-level.enum';
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
    if (LOGGER_CONFIG.level === LoggerConfigLevelEnum.DEBUG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.LOG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.SUCCESS || LOGGER_CONFIG.level === LoggerConfigLevelEnum.WARNING || LOGGER_CONFIG.level === LoggerConfigLevelEnum.ERROR) {
      this._log({
        context: loggerLog.context,
        extendedContext: loggerLog.extendedContext,
        loggerLogType: LoggerLogTypeEnum.ERROR,
        message: loggerLog.message
      });
    }
  }

  public warning(loggerLog: Readonly<ILoggerLog>): void {
    if (LOGGER_CONFIG.level === LoggerConfigLevelEnum.DEBUG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.LOG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.SUCCESS || LOGGER_CONFIG.level === LoggerConfigLevelEnum.WARNING) {
      this._log({
        context: loggerLog.context,
        extendedContext: loggerLog.extendedContext,
        loggerLogType: LoggerLogTypeEnum.WARNING,
        message: loggerLog.message
      });
    }
  }

  public success(loggerLog: Readonly<ILoggerLog>): void {
    if (LOGGER_CONFIG.level === LoggerConfigLevelEnum.DEBUG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.LOG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.SUCCESS) {
      this._log({
        context: loggerLog.context,
        extendedContext: loggerLog.extendedContext,
        loggerLogType: LoggerLogTypeEnum.SUCCESS,
        message: loggerLog.message
      });
    }
  }

  public log(loggerLog: Readonly<ILoggerLog>): void {
    if (LOGGER_CONFIG.level === LoggerConfigLevelEnum.DEBUG || LOGGER_CONFIG.level === LoggerConfigLevelEnum.LOG) {
      this._log({
        context: loggerLog.context,
        extendedContext: loggerLog.extendedContext,
        loggerLogType: LoggerLogTypeEnum.LOG,
        message: loggerLog.message
      });
    }
  }

  public debug(loggerLog: Readonly<ILoggerLog>): void {
    if (LOGGER_CONFIG.level === LoggerConfigLevelEnum.DEBUG) {
      this._log({
        context: loggerLog.context,
        extendedContext: loggerLog.extendedContext,
        loggerLogType: LoggerLogTypeEnum.DEBUG,
        message: loggerLog.message
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

      if (_.isString(loggerLogInternal.context) && !_.isEmpty(loggerLogInternal.context)) {
        console.log(`${logTypePrefix}${this._context(loggerLogInternal.context, loggerLogInternal.extendedContext)}${loggerLogInternal.message}`);
      } else {
        console.log(`${logTypePrefix}${loggerLogInternal.message}`);
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
