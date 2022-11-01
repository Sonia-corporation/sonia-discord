import { LoggerConfigLevelEnum } from './logger-config-level.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`LoggerConfigLevelEnum`, (): void => {
  it(`should have 5 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(LoggerConfigLevelEnum)).toBe(5);
  });

  it(`should have a member "ERROR"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.ERROR).toBe(`error`);
  });

  it(`should have a member "WARNING"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.WARNING).toBe(`warning`);
  });

  it(`should have a member "SUCCESS"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.SUCCESS).toBe(`success`);
  });

  it(`should have a member "LOG"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.LOG).toBe(`log`);
  });

  it(`should have a member "DEBUG"`, (): void => {
    expect.assertions(1);

    expect(LoggerConfigLevelEnum.DEBUG).toBe(`debug`);
  });
});
