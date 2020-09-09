import { FirebaseGuildChannelVersionEnum } from "./firebase-guild-channel-version.enum";

describe(`FirebaseGuildChannelVersionEnum`, (): void => {
  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildChannelVersionEnum.V1).toStrictEqual(1);
  });
});
