import { AppConfigValueNameEnum } from './app-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`AppConfigValueNameEnum`, (): void => {
  it(`should have 8 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(AppConfigValueNameEnum)).toBe(8);
  });

  it(`should have a member "FIRST_RELEASE_DATE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.FIRST_RELEASE_DATE).toBe(`first release date`);
  });

  it(`should have a member "INITIALIZATION_DATE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.INITIALIZATION_DATE).toBe(`initialization date`);
  });

  it(`should have a member "IS_PRODUCTION"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.IS_PRODUCTION).toBe(`production state`);
  });

  it(`should have a member "RELEASE_DATE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.RELEASE_DATE).toBe(`release date`);
  });

  it(`should have a member "RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.RELEASE_NOTES).toBe(`release notes`);
  });

  it(`should have a member "RELEASE_TYPE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.RELEASE_TYPE).toBe(`release type`);
  });

  it(`should have a member "TOTAL_RELEASE_COUNT"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.TOTAL_RELEASE_COUNT).toBe(`total release count`);
  });

  it(`should have a member "VERSION"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.VERSION).toBe(`version`);
  });
});
