import { upgradeFirebaseGuildChannelFeatureToV2 } from './upgrade-firebase-guild-channel-feature-to-v2';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { IFirebaseGuildChannelFeatureV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1';
import { createHydratedMock } from 'ts-auto-mock';

describe(`upgradeFirebaseGuildChannelFeatureToV2()`, (): void => {
  let firebaseGuildChannelFeature: IFirebaseGuildChannelFeatureV1;

  beforeEach((): void => {
    firebaseGuildChannelFeature = createHydratedMock<IFirebaseGuildChannelFeatureV1>();
  });

  it(`should return the same noon configuration`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildChannelFeatureToV2(firebaseGuildChannelFeature);

    expect(result.noon).toStrictEqual(firebaseGuildChannelFeature.noon);
  });

  it(`should return an empty release notes configuration`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildChannelFeatureToV2(firebaseGuildChannelFeature);

    expect(result.releaseNotes).toBeUndefined();
  });

  it(`should return a v2 version`, (): void => {
    expect.assertions(1);

    const result = upgradeFirebaseGuildChannelFeatureToV2(firebaseGuildChannelFeature);

    expect(result.version).toStrictEqual(FirebaseGuildChannelFeatureVersionEnum.V2);
  });
});
