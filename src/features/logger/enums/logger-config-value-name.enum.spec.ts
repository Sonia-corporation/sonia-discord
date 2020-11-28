import { LoggerConfigValueNameEnum } from './logger-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`LoggerConfigValueNameEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(LoggerConfigValueNameEnum)).toStrictEqual(2);
  });

  it(`should have a member "IS_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.IS_ENABLED).toStrictEqual(`enable state`);
  });

  it(`should have a member "LEVEL"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigValueNameEnum.LEVEL).toStrictEqual(`level`);
  });
});
