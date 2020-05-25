import { TimezoneEnum } from "./timezone.enum";

describe(`TimezoneEnum`, (): void => {
  it(`should have a member "PARIS"`, (): void => {
    expect.assertions(1);

    expect(TimezoneEnum.PARIS).toStrictEqual(`Europe/Paris`);
  });
});
