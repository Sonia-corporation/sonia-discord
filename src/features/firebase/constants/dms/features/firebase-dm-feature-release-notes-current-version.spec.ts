import { FIREBASE_DM_FEATURE_RELEASE_NOTES_CURRENT_VERSION } from './firebase-dm-feature-release-notes-current-version';

describe(`FIREBASE_DM_FEATURE_RELEASE_NOTES_CURRENT_VERSION`, (): void => {
  it(`should be V1`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_DM_FEATURE_RELEASE_NOTES_CURRENT_VERSION).toBe(1);
  });
});
