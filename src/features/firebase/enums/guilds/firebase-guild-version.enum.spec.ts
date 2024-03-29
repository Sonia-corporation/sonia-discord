import { FirebaseGuildVersionEnum } from './firebase-guild-version.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildVersionEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildVersionEnum)).toBe(10);
  });

  it(`should have a member "V1"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V1).toBe(1);
  });

  it(`should have a member "V2"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V2).toBe(2);
  });

  it(`should have a member "V3"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V3).toBe(3);
  });

  it(`should have a member "V4"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V4).toBe(4);
  });

  it(`should have a member "V5"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildVersionEnum.V5).toBe(5);
  });
});
