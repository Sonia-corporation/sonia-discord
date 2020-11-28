import { FirebaseGuildChannelFeatureNoonVersionEnum } from './firebase-guild-channel-feature-noon-version.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelFeatureNoonVersionEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelFeatureNoonVersionEnum)).toStrictEqual(1);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureNoonVersionEnum.V1).toStrictEqual(1);
  });
});
