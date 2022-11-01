import { LoggerConfigLevelValueEnum } from './logger-config-level-value.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`LoggerConfigLevelValueEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(LoggerConfigLevelValueEnum)).toBe(10);
  });

  it(`should have a member "error"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelValueEnum.error).toBe(0);
  });

  it(`should have a member "warning"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelValueEnum.warning).toBe(1);
  });

  it(`should have a member "success"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelValueEnum.success).toBe(2);
  });

  it(`should have a member "log"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelValueEnum.log).toBe(3);
  });

  it(`should have a member "debug"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelValueEnum.debug).toBe(4);
  });
});
