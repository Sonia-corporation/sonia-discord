import { LoggerLogTypeEnum } from './logger-log-type.enum';

describe(`loggerLogTypeEnum`, (): void => {
  it(`should have a member "error"`, (): void => {
    expect.assertions(1);

    expect(LoggerLogTypeEnum.ERROR).toStrictEqual(`error`);
  });

  it(`should have a member "warning"`, (): void => {
    expect.assertions(1);

    expect(LoggerLogTypeEnum.WARNING).toStrictEqual(`warning`);
  });

  it(`should have a member "success"`, (): void => {
    expect.assertions(1);

    expect(LoggerLogTypeEnum.SUCCESS).toStrictEqual(`success`);
  });

  it(`should have a member "log"`, (): void => {
    expect.assertions(1);

    expect(LoggerLogTypeEnum.LOG).toStrictEqual(`log`);
  });

  it(`should have a member "debug"`, (): void => {
    expect.assertions(1);

    expect(LoggerLogTypeEnum.DEBUG).toStrictEqual(`debug`);
  });
});
