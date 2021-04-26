import { handleFirebaseGuildChannelFeatureBreakingChange } from './handle-firebase-guild-channel-feature-breaking-change';
import { IObject } from '../../../../../../types/object';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { IFirebaseGuildChannelFeatureNoonV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-noon-v1';
import { IFirebaseGuildChannelFeatureReleaseNotesV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-release-notes-v1';
import { IFirebaseGuildChannelFeatureV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1';
import { IFirebaseGuildChannelFeatureV2 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v2';
import { createHydratedMock } from 'ts-auto-mock';

describe(`handleFirebaseGuildChannelFeatureBreakingChange()`, (): void => {
  describe(`when the given Firebase guild channel has no version`, (): void => {
    let firebaseGuildChannelFeature: IObject;

    beforeEach((): void => {
      firebaseGuildChannelFeature = {};
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        handleFirebaseGuildChannelFeatureBreakingChange(firebaseGuildChannelFeature);
      }).toThrow(new Error(`Firebase guild channel feature version not valid`));
    });
  });

  describe(`when the given Firebase guild channel feature is a v1`, (): void => {
    let firebaseGuildChannelFeature: IFirebaseGuildChannelFeatureV1;

    beforeEach((): void => {
      firebaseGuildChannelFeature = createHydratedMock<IFirebaseGuildChannelFeatureV1>({
        noon: undefined,
        version: FirebaseGuildChannelFeatureVersionEnum.V1,
      });
    });

    it(`should return the same noon configuration`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildChannelFeatureBreakingChange(firebaseGuildChannelFeature);

      expect(result.noon).toBeUndefined();
    });

    it(`should return a v2 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildChannelFeatureBreakingChange(firebaseGuildChannelFeature);

      expect(result.version).toStrictEqual(FirebaseGuildChannelFeatureVersionEnum.V2);
    });
  });

  describe(`when the given Firebase guild channel feature is a v2`, (): void => {
    let firebaseGuildChannelFeature: IFirebaseGuildChannelFeatureV2;

    beforeEach((): void => {
      firebaseGuildChannelFeature = createHydratedMock<IFirebaseGuildChannelFeatureV2>({
        noon: createHydratedMock<IFirebaseGuildChannelFeatureNoonV1>(),
        releaseNotes: createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotesV1>(),
        version: FirebaseGuildChannelFeatureVersionEnum.V2,
      });
    });

    it(`should return the given Firebase guild channel feature without changes`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildChannelFeatureBreakingChange(firebaseGuildChannelFeature);

      expect(result).toStrictEqual(firebaseGuildChannelFeature);
    });
  });
});
