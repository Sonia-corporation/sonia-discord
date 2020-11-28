import { FirebaseAppEnum } from './firebase-app.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`FirebaseAppEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseAppEnum)).toStrictEqual(1);
  });

  it(`should have a member "SONIA_DISCORD"`, (): void => {
    expect.assertions(1);

    expect(FirebaseAppEnum.SONIA_DISCORD).toStrictEqual(`sonia-discord`);
  });
});
