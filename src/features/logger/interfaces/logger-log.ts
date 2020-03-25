export interface ILoggerLog {
  context: Readonly<string>;
  extendedContext?: Readonly<boolean>;
  message: unknown;
}
