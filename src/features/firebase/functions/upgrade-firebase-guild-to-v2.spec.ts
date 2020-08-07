import { createMock } from "ts-auto-mock";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuildV1 } from "../interfaces/firebase-guild-v1";
import { upgradeFirebaseGuildToV2 } from "./upgrade-firebase-guild-to-v2";

describe(`upgradeFirebaseGuildToV2()`, (): void => {
  let firebaseGuild: IFirebaseGuildV1;

  beforeEach((): void => {
    firebaseGuild = createMock<IFirebaseGuildV1>();
  });

  it(`should return the same id`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV2(firebaseGuild);

    expect(result.id).toStrictEqual(firebaseGuild.id);
  });

  it(`should return an undefined last release notes version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV2(firebaseGuild);

    expect(result.lastReleaseNotesVersion).toBeUndefined();
  });

  it(`should return a v2 version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV2(firebaseGuild);

    expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V2);
  });
});
