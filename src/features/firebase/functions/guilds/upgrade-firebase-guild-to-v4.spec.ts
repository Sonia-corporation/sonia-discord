import { upgradeFirebaseGuildToV4 } from './upgrade-firebase-guild-to-v4';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV3 } from '../../interfaces/guilds/firebase-guild-v3';
import { createHydratedMock } from 'ts-auto-mock';

describe(`upgradeFirebaseGuildToV4()`, (): void => {
  let firebaseGuild: IFirebaseGuildV3;

  beforeEach((): void => {
    firebaseGuild = createHydratedMock<IFirebaseGuildV3>();
  });

  it(`should return an empty map of channels`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV4(firebaseGuild);

    expect(result.channels).toStrictEqual({});
  });

  it(`should return the same id`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV4(firebaseGuild);

    expect(result.id).toStrictEqual(firebaseGuild.id);
  });

  it(`should return the same last release notes version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV4(firebaseGuild);

    expect(result.lastReleaseNotesVersion).toStrictEqual(firebaseGuild.lastReleaseNotesVersion);
  });

  it(`should return a v4 version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV4(firebaseGuild);

    expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V4);
  });
});
