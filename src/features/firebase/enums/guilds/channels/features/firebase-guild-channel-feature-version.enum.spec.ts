import { FirebaseGuildChannelFeatureVersionEnum } from './firebase-guild-channel-feature-version.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelFeatureVersionEnum`, (): void => {
  it(`should have 4 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelFeatureVersionEnum)).toStrictEqual(4);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureVersionEnum.V1).toStrictEqual(1);
  });

  it(`should have a member "V2"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureVersionEnum.V2).toStrictEqual(2);
  });
});
