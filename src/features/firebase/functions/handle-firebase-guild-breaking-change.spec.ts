import { createMock } from "ts-auto-mock";
import { AnyObject } from "../../../types/any-object";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuildV1 } from "../interfaces/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../interfaces/firebase-guild-v2";
import { IAnyFirebaseGuild } from "../types/any-firebase-guild";
import { handleFirebaseGuildBreakingChange } from "./handle-firebase-guild-breaking-change";

describe(`handleFirebaseGuildBreakingChange()`, (): void => {
  let firebaseGuild: IAnyFirebaseGuild | AnyObject;

  describe(`when the given Firebase guild has no version`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<AnyObject>();
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect(handleFirebaseGuildBreakingChange(firebaseGuild)).toThrow(
        new Error(`Firebase guild version not valid`)
      );
    });

    it(`should return a last release notes version of 0.0.0`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.lastReleaseNotesVersion).toStrictEqual(`0.0.0`);
    });

    it(`should return a v2 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V2);
    });
  });

  describe(`when the given Firebase guild is a v1`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV1>();
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.id).toStrictEqual(firebaseGuild.id);
    });

    it(`should return a last release notes version of 0.0.0`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.lastReleaseNotesVersion).toStrictEqual(`0.0.0`);
    });

    it(`should return a v2 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V2);
    });
  });

  describe(`when the given Firebase guild is a v2`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV2>();
    });

    it(`should return the given Firebase guild without changes`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result).toStrictEqual(firebaseGuild);
    });
  });
});
