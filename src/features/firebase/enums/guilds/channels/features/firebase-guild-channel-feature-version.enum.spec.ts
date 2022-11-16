import { FirebaseGuildChannelFeatureVersionEnum } from './firebase-guild-channel-feature-version.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelFeatureVersionEnum`, (): void => {
  it(`should have 4 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelFeatureVersionEnum)).toBe(4);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureVersionEnum.V1).toBe(1);
  });

  it(`should have a member "V2"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureVersionEnum.V2).toBe(2);
  });
});
