import { FirebaseGuildChannelFeatureNoonVersionEnum } from './firebase-guild-channel-feature-noon-version.enum';

describe(`FirebaseGuildChannelFeatureNoonVersionEnum`, (): void => {
  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureNoonVersionEnum.V1).toStrictEqual(1);
  });
});
