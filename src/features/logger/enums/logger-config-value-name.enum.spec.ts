import { LoggerConfigValueNameEnum } from "./logger-config-value-name.enum";

describe(`LoggerConfigValueNameEnum`, (): void => {
  it(`should have a member "IS_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.IS_ENABLED).toStrictEqual(`enable state`);
  });

  it(`should have a member "LEVEL"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.LEVEL).toStrictEqual(`level`);
  });
});
