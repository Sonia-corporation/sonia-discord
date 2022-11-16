import { FIREBASE_GUILD_CURRENT_VERSION } from './firebase-guild-current-version';

describe(`FIREBASE_GUILD_CURRENT_VERSION`, (): void => {
  it(`should be V5`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_GUILD_CURRENT_VERSION).toBe(5);
  });
});
