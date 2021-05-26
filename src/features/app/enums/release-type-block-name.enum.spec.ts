import { ReleaseTypeBlockNameEnum } from './release-type-block-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`ReleaseTypeBlockNameEnum`, (): void => {
  it(`should have 3 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ReleaseTypeBlockNameEnum)).toStrictEqual(3);
  });

  it(`should have a member "BUG_FIXES"`, (): void => {
    expect.assertions(1);

    expect(ReleaseTypeBlockNameEnum.BUG_FIXES).toStrictEqual(`Bug Fixes`);
  });

  it(`should have a member "FEATURES"`, (): void => {
    expect.assertions(1);

    expect(ReleaseTypeBlockNameEnum.FEATURES).toStrictEqual(`Features`);
  });

  it(`should have a member "PERFORMANCE_IMPROVEMENTS"`, (): void => {
    expect.assertions(1);

    expect(ReleaseTypeBlockNameEnum.PERFORMANCE_IMPROVEMENTS).toStrictEqual(`Performance Improvements`);
  });
});
