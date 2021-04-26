import { hasFirebaseGuildChannels } from './has-firebase-guild-channels';
import { FirebaseGuildVersionEnum } from '../../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../interfaces/guilds/firebase-guild-v2';
import { IFirebaseGuildV3 } from '../../../interfaces/guilds/firebase-guild-v3';
import { IFirebaseGuildV4 } from '../../../interfaces/guilds/firebase-guild-v4';
import { IFirebaseGuildV5 } from '../../../interfaces/guilds/firebase-guild-v5';
import { IFirebaseGuild } from '../../../types/guilds/firebase-guild';
import { createHydratedMock } from 'ts-auto-mock';

describe(`hasFirebaseGuildChannels()`, (): void => {
  let firebaseGuild: IFirebaseGuild;

  describe(`when the given Firebase guild is a v1`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV1>({
        version: FirebaseGuildVersionEnum.V1,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = hasFirebaseGuildChannels(firebaseGuild);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v2`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV2>({
        version: FirebaseGuildVersionEnum.V2,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = hasFirebaseGuildChannels(firebaseGuild);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v3`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV3>({
        version: FirebaseGuildVersionEnum.V3,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = hasFirebaseGuildChannels(firebaseGuild);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given Firebase guild is a v4`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV4>({
        version: FirebaseGuildVersionEnum.V4,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = hasFirebaseGuildChannels(firebaseGuild);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given Firebase guild is a v5`, (): void => {
    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV5>({
        version: FirebaseGuildVersionEnum.V5,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = hasFirebaseGuildChannels(firebaseGuild);

      expect(result).toStrictEqual(true);
    });
  });
});
