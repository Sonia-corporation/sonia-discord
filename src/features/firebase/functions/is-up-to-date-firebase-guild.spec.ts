import { createMock } from "ts-auto-mock";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuildV1 } from "../interfaces/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../interfaces/firebase-guild-v2";
import { IFirebaseGuildV3 } from "../interfaces/firebase-guild-v3";
import { isUpToDateFirebaseGuild } from "./is-up-to-date-firebase-guild";

describe(`isUpToDateFirebaseGuild()`, (): void => {
  describe(`when the given Firebase guild is a v1`, (): void => {
    let firebaseGuild: IFirebaseGuildV1;

    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV1>({
        version: FirebaseGuildVersionEnum.V1,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isUpToDate = isUpToDateFirebaseGuild(firebaseGuild);

      expect(isUpToDate).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v2`, (): void => {
    let firebaseGuild: IFirebaseGuildV2;

    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV2>({
        version: FirebaseGuildVersionEnum.V2,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isUpToDate = isUpToDateFirebaseGuild(firebaseGuild);

      expect(isUpToDate).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v3`, (): void => {
    let firebaseGuild: IFirebaseGuildV3;

    beforeEach((): void => {
      firebaseGuild = createMock<IFirebaseGuildV3>({
        version: FirebaseGuildVersionEnum.V3,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isUpToDate = isUpToDateFirebaseGuild(firebaseGuild);

      expect(isUpToDate).toStrictEqual(true);
    });
  });
});
