import { FirebaseDmFeatureNoonVersionEnum } from './firebase-dm-feature-noon-version.enum';
import { getEnumLength } from '../../../../../functions/checks/get-enum-length';

describe(`FirebaseDmFeatureNoonVersionEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseDmFeatureNoonVersionEnum)).toBe(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseDmFeatureNoonVersionEnum.V1).toBe(1);
  });
});
