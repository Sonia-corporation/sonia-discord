import _ from "lodash";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerLog } from "../../interfaces/logger-log";
import { ILoggerLogInternal } from "../../interfaces/logger-log-internal";
import { ILoggerServiceCreated } from "../../interfaces/logger-service-created";

export class LoggerService {
  private static _instance: LoggerService;

  public static getInstance(): LoggerService {
    if (_.isNil(LoggerService._instance)) {
      LoggerService._instance = new LoggerService();
    }

    return LoggerService._instance;
  }

  private readonly _logPrefix = `● `;

  public error(loggerLog: Readonly<ILoggerLog>): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.ERROR,
    });
  }

  public warning(loggerLog: Readonly<ILoggerLog>): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.WARNING,
    });
  }

  public success(loggerLog: Readonly<ILoggerLog>): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.SUCCESS,
    });
  }

  public log(loggerLog: Readonly<ILoggerLog>): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.LOG,
    });
  }

  public debug(loggerLog: Readonly<ILoggerLog>): void {
    this._log({
      ...loggerLog,
      loggerLogType: LoggerConfigLevelEnum.DEBUG,
    });
  }

  public serviceCreated(
    loggerServiceCreated: Readonly<ILoggerServiceCreated>
  ): void {
    this.debug({
      context: loggerServiceCreated.service,
      message: `created`,
    });
  }

  public getStringArray(array: Readonly<string>[]): string {
    return `[ ${_.join(
      _.map(array, (value: Readonly<string>): string => {
        return wrapInQuotes(value);
      }),
      `, `
    )} ]`;
  }

  public getValueUpdateWithHint(
    text: Readonly<string>,
    value: Readonly<string>,
    hint: Readonly<string>
  ): string {
    return `${text}${value}${hint}`;
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

  public getHiddenValueArrayUpdate(
    text: Readonly<string>,
    isStringValue = false
  ): string {
    let value = `********`;

    if (_.isEqual(isStringValue, true)) {
      value = wrapInQuotes(value);
    }

    value = `[ ${value} ]`;

    return this.getValueUpdateWithHint(text, value, ` (hidden)`);
  }

  public getSnowflakeContext(
    context: Readonly<string>,
    message: Readonly<string | null | undefined> | unknown
  ): string {
    return `[${context}] ${message}`;
  }

  private _log(loggerLogInternal: Readonly<ILoggerLogInternal>): void {
    const logTypePrefix: string = this._getLogTypePrefix();

    if (
      _.isString(loggerLogInternal.context) &&
      !_.isEmpty(loggerLogInternal.context)
    ) {
      console.log(
        `${logTypePrefix}${this._context(
          loggerLogInternal.context,
          loggerLogInternal.extendedContext
        )}${loggerLogInternal.message}`
      );
    } else {
      console.log(`${logTypePrefix}${loggerLogInternal.message}`);
    }
  }

  private _context(
    name: Readonly<string>,
    hasExtendedContext: Readonly<boolean> = false
  ): string {
    let message = `[${name}][now-format]`;

    if (
      _.isEqual(hasExtendedContext, false) ||
      !_.isBoolean(hasExtendedContext)
    ) {
      message = `${message} `;
    }

    return message;
  }

  private _getLogTypePrefix(): string {
    return this._logPrefix;
  }
}
