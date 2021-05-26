import { upgradeFirebaseGuildToV3 } from './upgrade-firebase-guild-to-v3';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV2 } from '../../interfaces/guilds/firebase-guild-v2';
import { createHydratedMock } from 'ts-auto-mock';

describe(`upgradeFirebaseGuildToV3()`, (): void => {
  let firebaseGuild: IFirebaseGuildV2;

  beforeEach((): void => {
    firebaseGuild = createHydratedMock<IFirebaseGuildV2>();
  });

  it(`should return an empty list of channels`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV3(firebaseGuild);

    expect(result.channels).toStrictEqual([]);
  });

  it(`should return the same id`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV3(firebaseGuild);

    expect(result.id).toStrictEqual(firebaseGuild.id);
  });

  it(`should return the same last release notes version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV3(firebaseGuild);

    expect(result.lastReleaseNotesVersion).toStrictEqual(firebaseGuild.lastReleaseNotesVersion);
  });

  it(`should return a v3 version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV3(firebaseGuild);

    expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V3);
  });
});
