import { LoggerConfigValueNameEnum } from './logger-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`LoggerConfigValueNameEnum`, (): void => {
  it(`should have 3 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(LoggerConfigValueNameEnum)).toBe(3);
  });

  it(`should have a member "IS_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.IS_ENABLED).toBe(`enable state`);
  });

  it(`should have a member "LEVEL"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.LEVEL).toBe(`level`);
  });

  it(`should have a member "SHOULD_DISPLAY_MORE_DEBUG_LOGS"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.SHOULD_DISPLAY_MORE_DEBUG_LOGS).toBe(`should display more debug logs`);
  });
});
