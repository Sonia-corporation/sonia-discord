import { FirebaseCollectionEnum } from './firebase-collection.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`FirebaseCollectionEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseCollectionEnum)).toBe(1);
  });

  it(`should have a member "GUILDS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseCollectionEnum.GUILDS).toStrictEqual(`guilds`);
  });
});
