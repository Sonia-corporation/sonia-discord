import { handleFirebaseGuildChannelBreakingChange } from './handle-firebase-guild-channel-breaking-change';
import { IObject } from '../../../../../types/object';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { IFirebaseGuildChannelFeatureV1 } from '../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1';
import { IFirebaseGuildChannelFeatureV2 } from '../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v2';
import { IFirebaseGuildChannelV1 } from '../../../interfaces/guilds/channels/firebase-guild-channel-v1';
import { IFirebaseGuildChannelV2 } from '../../../interfaces/guilds/channels/firebase-guild-channel-v2';
import { createHydratedMock } from 'ts-auto-mock';

describe(`handleFirebaseGuildChannelBreakingChange()`, (): void => {
  describe(`when the given Firebase guild channel has no version`, (): void => {
    let firebaseGuildChannel: IObject;

    beforeEach((): void => {
      firebaseGuildChannel = {};
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        handleFirebaseGuildChannelBreakingChange(firebaseGuildChannel);
      }).toThrow(new Error(`Firebase guild channel version not valid`));
    });
  });

  describe(`when the given Firebase guild channel is a v1`, (): void => {
    let firebaseGuildChannel: IFirebaseGuildChannelV1;

    beforeEach((): void => {
      firebaseGuildChannel = createHydratedMock<IFirebaseGuildChannelV1>({
        features: undefined,
        id: `dummy-id`,
        version: FirebaseGuildChannelVersionEnum.V1,
      });
    });

    describe(`when there is no features configured`, (): void => {
      beforeEach((): void => {
        firebaseGuildChannel.features = undefined;
      });

      it(`should return the same features`, (): void => {
        expect.assertions(1);

        const result = handleFirebaseGuildChannelBreakingChange(firebaseGuildChannel);

        expect(result.features).toBeUndefined();
      });
    });

    describe(`when there is some features configured`, (): void => {
      beforeEach((): void => {
        firebaseGuildChannel.features = createHydratedMock<IFirebaseGuildChannelFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return a features upgraded to v2`, (): void => {
        expect.assertions(1);

        const result = handleFirebaseGuildChannelBreakingChange(firebaseGuildChannel);

        expect(result.features).toStrictEqual({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          releaseNotes: undefined,
          version: FirebaseGuildChannelFeatureVersionEnum.V2,
        } as IFirebaseGuildChannelFeatureV2);
      });
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildChannelBreakingChange(firebaseGuildChannel);

      expect(result.id).toStrictEqual(`dummy-id`);
    });

    it(`should return a v2 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildChannelBreakingChange(firebaseGuildChannel);

      expect(result.version).toStrictEqual(FirebaseGuildChannelVersionEnum.V2);
    });
  });

  describe(`when the given Firebase guild channel is a v2`, (): void => {
    let firebaseGuildChannel: IFirebaseGuildChannelV2;

    beforeEach((): void => {
      firebaseGuildChannel = createHydratedMock<IFirebaseGuildChannelV2>({
        features: createHydratedMock<IFirebaseGuildChannelFeatureV2>(),
        id: `dummy-id`,
        version: FirebaseGuildChannelVersionEnum.V2,
      });
    });

    it(`should return the given Firebase guild channel without changes`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseGuildChannelBreakingChange(firebaseGuildChannel);

      expect(result).toStrictEqual(firebaseGuildChannel);
    });
  });
});
