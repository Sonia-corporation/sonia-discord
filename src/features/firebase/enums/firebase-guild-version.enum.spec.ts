import { FirebaseGuildVersionEnum } from "./firebase-guild-version.enum";

describe(`FirebaseGuildVersionEnum`, (): void => {
  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V1).toStrictEqual(1);
  });
});
