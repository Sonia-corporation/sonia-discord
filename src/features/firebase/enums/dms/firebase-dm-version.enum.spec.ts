import { FirebaseDmVersionEnum } from './firebase-dm-version.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`FirebaseDmVersionEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseDmVersionEnum)).toBe(2);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseDmVersionEnum.V1).toBe(1);
  });
});
