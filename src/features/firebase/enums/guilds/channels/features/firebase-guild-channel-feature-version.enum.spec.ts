import { FirebaseGuildChannelFeatureVersionEnum } from './firebase-guild-channel-feature-version.enum';

describe(`FirebaseGuildChannelFeatureVersionEnum`, (): void => {
  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureVersionEnum.V1).toStrictEqual(1);
  });
});
