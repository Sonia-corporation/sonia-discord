import { TimezoneEnum } from './timezone.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`TimezoneEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(TimezoneEnum)).toStrictEqual(1);
  });

  it(`should have a member "PARIS"`, (): void => {
    expect.assertions(1);

    expect(TimezoneEnum.PARIS).toStrictEqual(`Europe/Paris`);
  });
});
