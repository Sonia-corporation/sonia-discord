import { FirebaseCollectionEnum } from "./firebase-collection.enum";

describe(`FirebaseCollectionEnum`, (): void => {
  it(`should have a member "GUILDS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseCollectionEnum.GUILDS).toStrictEqual(`guilds`);
  });
});
