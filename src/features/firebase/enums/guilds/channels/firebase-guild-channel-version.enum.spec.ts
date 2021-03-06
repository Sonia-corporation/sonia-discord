import { FirebaseGuildChannelVersionEnum } from './firebase-guild-channel-version.enum';
import { getEnumLength } from '../../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildChannelVersionEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildChannelVersionEnum)).toStrictEqual(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelVersionEnum.V1).toStrictEqual(1);
  });
});
