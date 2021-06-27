import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from './firebase-guild-channel-feature-release-notes-version.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelFeatureReleaseNotesVersionEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelFeatureReleaseNotesVersionEnum)).toStrictEqual(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1).toStrictEqual(1);
  });
});
