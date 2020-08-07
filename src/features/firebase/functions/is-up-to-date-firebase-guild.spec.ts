import { createMock } from "ts-auto-mock";
import { IFirebaseGuildV1 } from "../interfaces/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../interfaces/firebase-guild-v2";
import { IAnyFirebaseGuild } from "../types/any-firebase-guild";
import { isUpToDateFirebaseGuild } from "./is-up-to-date-firebase-guild";

describe(`isUpToDateFirebaseGuild()`, (): void => {
  let firebaseGuild: IAnyFirebaseGuild;

  describe(`when the given Firebase guild is a v1`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV1>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isUpToDate = isUpToDateFirebaseGuild(firebaseGuild);

      expect(isUpToDate).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v2`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV2>();
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isUpToDate = isUpToDateFirebaseGuild(firebaseGuild);

      expect(isUpToDate).toStrictEqual(true);
    });
  });
});
