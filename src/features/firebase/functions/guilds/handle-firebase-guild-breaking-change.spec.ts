import { handleFirebaseGuildBreakingChange } from './handle-firebase-guild-breaking-change';
import { IObject } from '../../../../types/object';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildChannelV1 } from '../../interfaces/guilds/channels/firebase-guild-channel-v1';
import { IFirebaseGuildChannelV2 } from '../../interfaces/guilds/channels/firebase-guild-channel-v2';
import { IFirebaseGuildV1 } from '../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../interfaces/guilds/firebase-guild-v2';
import { IFirebaseGuildV3 } from '../../interfaces/guilds/firebase-guild-v3';
import { IFirebaseGuildV4 } from '../../interfaces/guilds/firebase-guild-v4';
import { IFirebaseGuildV5 } from '../../interfaces/guilds/firebase-guild-v5';
import { createHydratedMock } from 'ts-auto-mock';

describe(`handleFirebaseGuildBreakingChange()`, (): void => {
  describe(`when the given Firebase guild has no version`, (): void => {
    let firebaseGuild: IObject;

    beforeEach((): void => {
      firebaseGuild = {};
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        handleFirebaseGuildBreakingChange(firebaseGuild);
      }).toThrow(new Error(`Firebase guild version not valid`));
    });
  });

  describe(`when the given Firebase guild is a v1`, (): void => {
    let firebaseGuild: IFirebaseGuildV1;

    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV1>({
        id: `dummy-id`,
        version: FirebaseGuildVersionEnum.V1,
      });
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.id).toStrictEqual(`dummy-id`);
    });

    it(`should return a last release notes version of 0.0.0`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.lastReleaseNotesVersion).toStrictEqual(`0.0.0`);
    });

    it(`should return a v5 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V5);
    });
  });

  describe(`when the given Firebase guild is a v2`, (): void => {
    let firebaseGuild: IFirebaseGuildV2;

    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV2>({
        id: `dummy-id`,
        lastReleaseNotesVersion: `dummy-last-release-notes-version`,
        version: FirebaseGuildVersionEnum.V2,
      });
    });

    it(`should return an empty map of channels`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.channels).toStrictEqual({});
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.id).toStrictEqual(`dummy-id`);
    });

    it(`should return the same last release notes version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.lastReleaseNotesVersion).toStrictEqual(`dummy-last-release-notes-version`);
    });

    it(`should return a v5 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V5);
    });
  });

  describe(`when the given Firebase guild is a v3`, (): void => {
    let firebaseGuild: IFirebaseGuildV3;

    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV3>({
        channels: [createHydratedMock<IFirebaseGuildChannelV1>()],
        id: `dummy-id`,
        lastReleaseNotesVersion: `dummy-last-release-notes-version`,
        version: FirebaseGuildVersionEnum.V3,
      });
    });

    it(`should return an empty map of channels`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.channels).toStrictEqual({});
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.id).toStrictEqual(`dummy-id`);
    });

    it(`should return the same last release notes version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.lastReleaseNotesVersion).toStrictEqual(`dummy-last-release-notes-version`);
    });

    it(`should return a v5 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V5);
    });
  });

  describe(`when the given Firebase guild is a v4`, (): void => {
    let firebaseGuild: IFirebaseGuildV4;

    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV4>({
        channels: {},
        id: `dummy-id`,
        lastReleaseNotesVersion: `dummy-last-release-notes-version`,
        version: FirebaseGuildVersionEnum.V4,
      });
    });

    describe(`when there is no channel`, (): void => {
      beforeEach((): void => {
        firebaseGuild.channels = {};
      });

      it(`should return an empty map of channels`, (): void => {
        expect.assertions(1);

        const result = handleFirebaseGuildBreakingChange(firebaseGuild);

        expect(result.channels).toStrictEqual({});
      });
    });

    describe(`when there is a channel configured`, (): void => {
      beforeEach((): void => {
        firebaseGuild.channels = {
          1: createHydratedMock<IFirebaseGuildChannelV1>({
            features: {
              noon: {
                isEnabled: false,
                version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
              },
              version: FirebaseGuildChannelFeatureVersionEnum.V1,
            },
            id: `dummy-id`,
            version: FirebaseGuildChannelVersionEnum.V1,
          }),
        };
      });

      it(`should return a channel upgraded to v2`, (): void => {
        expect.assertions(1);

        const result = handleFirebaseGuildBreakingChange(firebaseGuild);

        expect(result.channels).toStrictEqual({
          1: {
            features: {
              noon: {
                isEnabled: false,
                version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
              },
              releaseNotes: undefined,
              version: FirebaseGuildChannelFeatureVersionEnum.V2,
            },
            id: `dummy-id`,
            version: FirebaseGuildChannelVersionEnum.V2,
          } as IFirebaseGuildChannelV2,
        });
      });
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.id).toStrictEqual(`dummy-id`);
    });

    it(`should return the same last release notes version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.lastReleaseNotesVersion).toStrictEqual(`dummy-last-release-notes-version`);
    });

    it(`should return a v5 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V5);
    });
  });

  describe(`when the given Firebase guild is a v5`, (): void => {
    let firebaseGuild: IFirebaseGuildV5;

    beforeEach((): void => {
      firebaseGuild = createHydratedMock<IFirebaseGuildV5>({
        version: FirebaseGuildVersionEnum.V5,
      });
    });

    it(`should return the given Firebase guild without changes`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildBreakingChange(firebaseGuild);

      expect(result).toStrictEqual(firebaseGuild);
    });
  });
});
