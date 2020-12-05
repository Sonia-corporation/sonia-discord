import { FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION } from './firebase-guild-channel-feature-release-notes-current-version';

describe(`FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION`, (): void => {
  it(`should be V1`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION).toStrictEqual(1);
  });
});
