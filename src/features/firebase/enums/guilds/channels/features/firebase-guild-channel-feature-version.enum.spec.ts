import { FirebaseGuildChannelFeatureVersionEnum } from './firebase-guild-channel-feature-version.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelFeatureVersionEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelFeatureVersionEnum)).toStrictEqual(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureVersionEnum.V1).toStrictEqual(1);
  });
});
