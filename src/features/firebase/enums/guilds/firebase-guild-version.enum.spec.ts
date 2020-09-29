import { FirebaseGuildVersionEnum } from "./firebase-guild-version.enum";

describe(`FirebaseGuildVersionEnum`, (): void => {
  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V1).toStrictEqual(1);
  });

  it(`should have a member "V2"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V2).toStrictEqual(2);
  });

  it(`should have a member "V3"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V3).toStrictEqual(3);
  });

  it(`should have a member "V4"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V4).toStrictEqual(4);
  });
});
