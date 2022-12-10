import { FirebaseDmFeatureVersionEnum } from './firebase-dm-feature-version.enum';
import { getEnumLength } from '../../../../../functions/checks/get-enum-length';

describe(`FirebaseDmFeatureVersionEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseDmFeatureVersionEnum)).toBe(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseDmFeatureVersionEnum.V1).toBe(1);
  });
});
