import { createMock } from "ts-auto-mock";
import { FirebaseGuildVersionEnum } from "../../../enums/guilds/firebase-guild-version.enum";
import { IFirebaseGuildV1 } from "../../../interfaces/guilds/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../../../interfaces/guilds/firebase-guild-v2";
import { IFirebaseGuildV3 } from "../../../interfaces/guilds/firebase-guild-v3";
import { IFirebaseGuild } from "../../../types/guilds/firebase-guild";
import { hasFirebaseGuildLastReleaseNotesVersion } from "./has-firebase-guild-last-release-notes-version";

describe(`hasFirebaseGuildLastReleaseNotesVersion()`, (): void => {
  let firebaseGuild: IFirebaseGuild;

  describe(`when the given Firebase guild is a v1`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV1>({
        version: FirebaseGuildVersionEnum.V1,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const hasProperty = hasFirebaseGuildLastReleaseNotesVersion(
        firebaseGuild
      );

      expect(hasProperty).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v2`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV2>({
        version: FirebaseGuildVersionEnum.V2,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const hasProperty = hasFirebaseGuildLastReleaseNotesVersion(
        firebaseGuild
      );

      expect(hasProperty).toStrictEqual(true);
    });
  });

  describe(`when the given Firebase guild is a v3`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV3>({
        version: FirebaseGuildVersionEnum.V3,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const hasProperty = hasFirebaseGuildLastReleaseNotesVersion(
        firebaseGuild
      );

      expect(hasProperty).toStrictEqual(true);
    });
  });
});
