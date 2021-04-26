import { upgradeFirebaseGuildToV2 } from './upgrade-firebase-guild-to-v2';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../interfaces/guilds/firebase-guild-v1';
import { createHydratedMock } from 'ts-auto-mock';

describe(`upgradeFirebaseGuildToV2()`, (): void => {
  let firebaseGuild: IFirebaseGuildV1;

  beforeEach((): void => {
    firebaseGuild = createHydratedMock<IFirebaseGuildV1>();
  });

  it(`should return the same id`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV2(firebaseGuild);

    expect(result.id).toStrictEqual(firebaseGuild.id);
  });

  it(`should return a last release notes version of 0.0.0`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV2(firebaseGuild);

    expect(result.lastReleaseNotesVersion).toStrictEqual(`0.0.0`);
  });

  it(`should return a v2 version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV2(firebaseGuild);

    expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V2);
  });
});
