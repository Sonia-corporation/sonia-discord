import { LoggerConfigLevelEnum } from './logger-config-level.enum';

describe(`loggerConfigLevelEnum`, (): void => {
  it(`should have a member "error"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.ERROR).toStrictEqual(`error`);
  });

  it(`should have a member "warning"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.WARNING).toStrictEqual(`warning`);
  });

  it(`should have a member "success"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.SUCCESS).toStrictEqual(`success`);
  });

  it(`should have a member "log"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.LOG).toStrictEqual(`log`);
  });

  it(`should have a member "debug"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.DEBUG).toStrictEqual(`debug`);
  });
});
