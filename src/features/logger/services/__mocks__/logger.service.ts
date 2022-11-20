import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { LoggerConfigLevelEnum } from '../../enums/logger-config-level.enum';
import { ILoggerLog } from '../../interfaces/logger-log';
import { ILoggerLogInternal } from '../../interfaces/logger-log-internal';
import { ILoggerServiceCreated } from '../../interfaces/logger-service-created';
import _ from 'lodash';

export class LoggerService {
  private static _instance: LoggerService;

  public static getInstance(): LoggerService {
    if (_.isNil(LoggerService._instance)) {
      LoggerService._instance = new LoggerService();
    }

    return LoggerService._instance;
  }

  private readonly _logPrefix = `● `;

  public error(loggerLog: ILoggerLog): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.ERROR,
    });
  }

  public warning(loggerLog: ILoggerLog): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.WARNING,
    });
  }

  public success(loggerLog: ILoggerLog): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.SUCCESS,
    });
  }

  public log(loggerLog: ILoggerLog): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.LOG,
    });
  }

  public debug(loggerLog: ILoggerLog): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.DEBUG,
    });
  }

  public serviceCreated(loggerServiceCreated: ILoggerServiceCreated): void {
    this.debug({
      context: loggerServiceCreated.service,
      message: `created`,
    });
  }

  public getStringArray(array: string[]): string {
    return `[ ${_.join(
      _.map(array, (value: string): string => wrapInQuotes(value)),
      `, `
    )} ]`;
  }

  public getValueUpdateWithHint(text: string, value: string, hint: string): string {
    return `${text}${value}${hint}`;
  }

  public getHiddenValueUpdate(text: string, isStringValue = false): string {
    let value = `********`;

    if (_.isEqual(isStringValue, true)) {
      value = wrapInQuotes(value);
    }

    return this.getValueUpdateWithHint(text, value, ` (hidden)`);
  }

  public getHiddenValueArrayUpdate(text: string, isStringValue = false): string {
    let value = `********`;

    if (_.isEqual(isStringValue, true)) {
      value = wrapInQuotes(value);
    }

    value = `[ ${value} ]`;

    return this.getValueUpdateWithHint(text, value, ` (hidden)`);
  }

  public getSnowflakeContext(context: string, message: string | null | undefined | unknown): string {
    return `[${context}] ${_.toString(message)}`;
  }

  private _log(loggerLogInternal: ILoggerLogInternal): void {
    const logTypePrefix: string = this._getLogTypePrefix();

    if (_.isString(loggerLogInternal.context) && !_.isEmpty(loggerLogInternal.context)) {
      console.log(
        `${logTypePrefix}${this._context(loggerLogInternal.context, loggerLogInternal.hasExtendedContext)}${_.toString(
          loggerLogInternal.message
        )}`
      );
    } else {
      console.log(`${logTypePrefix}${_.toString(loggerLogInternal.message)}`);
    }
  }

  private _context(name: string, hasExtendedContext = false): string {
    let message = `[${name}][now-format]`;

    if (_.isEqual(hasExtendedContext, false) || !_.isBoolean(hasExtendedContext)) {
      message = `${message} `;
    }

    return message;
  }

  private _getLogTypePrefix(): string {
    return this._logPrefix;
  }
}
