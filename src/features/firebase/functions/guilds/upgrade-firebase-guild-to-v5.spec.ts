import { upgradeFirebaseGuildToV5 } from './upgrade-firebase-guild-to-v5';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildChannelV1 } from '../../interfaces/guilds/channels/firebase-guild-channel-v1';
import { IFirebaseGuildChannelV2 } from '../../interfaces/guilds/channels/firebase-guild-channel-v2';
import { IFirebaseGuildV4 } from '../../interfaces/guilds/firebase-guild-v4';
import { createHydratedMock } from 'ts-auto-mock';

describe(`upgradeFirebaseGuildToV5()`, (): void => {
  let firebaseGuild: IFirebaseGuildV4;

  beforeEach((): void => {
    firebaseGuild = createHydratedMock<IFirebaseGuildV4>();
  });

  describe(`when there is no channel`, (): void => {
    beforeEach((): void => {
      firebaseGuild.channels = {};
    });

    it(`should return an empty map of channels`, (): void => {
      expect.assertions(1);

      const result = upgradeFirebaseGuildToV5(firebaseGuild);

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

      const result = upgradeFirebaseGuildToV5(firebaseGuild);

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

    const result = upgradeFirebaseGuildToV5(firebaseGuild);

    expect(result.id).toStrictEqual(firebaseGuild.id);
  });

  it(`should return the same last release notes version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV5(firebaseGuild);

    expect(result.lastReleaseNotesVersion).toStrictEqual(firebaseGuild.lastReleaseNotesVersion);
  });

  it(`should return a v5 version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildToV5(firebaseGuild);

    expect(result.version).toStrictEqual(FirebaseGuildVersionEnum.V5);
  });
});
