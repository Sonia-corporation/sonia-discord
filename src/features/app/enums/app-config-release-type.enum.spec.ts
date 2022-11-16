import { AppConfigReleaseTypeEnum } from './app-config-release-type.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`AppConfigReleaseTypeEnum`, (): void => {
  it(`should have 5 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(AppConfigReleaseTypeEnum)).toBe(5);
  });

  it(`should have a member "UNKNOWN"`, (): void => {
    expect.assertions(1);

    expect(AppConfigReleaseTypeEnum.UNKNOWN).toBe(`unknown`);
  });

  it(`should have a member "MIXED"`, (): void => {
    expect.assertions(1);

    expect(AppConfigReleaseTypeEnum.MIXED).toBe(`mixed`);
  });

  it(`should have a member "BUG_FIXES"`, (): void => {
    expect.assertions(1);

    expect(AppConfigReleaseTypeEnum.BUG_FIXES).toBe(`bug fixes`);
  });

  it(`should have a member "FEATURES"`, (): void => {
    expect.assertions(1);

    expect(AppConfigReleaseTypeEnum.FEATURES).toBe(`features`);
  });

  it(`should have a member "PERFORMANCE_IMPROVEMENTS"`, (): void => {
    expect.assertions(1);

    expect(AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS).toBe(`performance improvements`);
  });
});
