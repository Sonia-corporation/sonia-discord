import { FirebaseCollectionEnum } from './firebase-collection.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`FirebaseCollectionEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseCollectionEnum)).toBe(2);
  });

  it(`should have a member "DMS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseCollectionEnum.DMS).toBe(`dms`);
  });

  it(`should have a member "GUILDS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseCollectionEnum.GUILDS).toBe(`guilds`);
  });
});
