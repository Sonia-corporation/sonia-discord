import { LoggerConfigLevelEnum } from "./logger-config-level.enum";

describe(`LoggerConfigLevelEnum`, (): void => {
  it(`should have a member "ERROR"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.ERROR).toStrictEqual(`error`);
  });

  it(`should have a member "WARNING"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.WARNING).toStrictEqual(`warning`);
  });

  it(`should have a member "SUCCESS"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.SUCCESS).toStrictEqual(`success`);
  });

  it(`should have a member "LOG"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.LOG).toStrictEqual(`log`);
  });

  it(`should have a member "DEBUG"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.DEBUG).toStrictEqual(`debug`);
  });
});
