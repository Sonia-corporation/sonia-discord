import { FirebaseGuildChannelFeatureNoonVersionEnum } from './firebase-guild-channel-feature-noon-version.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelFeatureNoonVersionEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelFeatureNoonVersionEnum)).toBe(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureNoonVersionEnum.V1).toBe(1);
  });
});
