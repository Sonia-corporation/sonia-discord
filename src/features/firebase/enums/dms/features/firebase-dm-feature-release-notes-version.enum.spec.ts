import { FirebaseDmFeatureReleaseNotesVersionEnum } from './firebase-dm-feature-release-notes-version.enum';
import { getEnumLength } from '../../../../../functions/checks/get-enum-length';

describe(`FirebaseDmFeatureReleaseNotesVersionEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseDmFeatureReleaseNotesVersionEnum)).toBe(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseDmFeatureReleaseNotesVersionEnum.V1).toBe(1);
  });
});
