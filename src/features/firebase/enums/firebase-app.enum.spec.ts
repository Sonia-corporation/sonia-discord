import { FirebaseAppEnum } from "./firebase-app.enum";

describe(`FirebaseAppEnum`, (): void => {
  it(`should have a member "SONIA_DISCORD"`, (): void => {
    expect.assertions(1);

    expect(FirebaseAppEnum.SONIA_DISCORD).toStrictEqual(`sonia-discord`);
  });
});
