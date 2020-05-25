import { TimezoneEnum } from "./timezone.enum";

describe(`TimezoneEnum`, (): void => {
  it(``, (): void => {
    expect.assertions(1);

    expect(TimezoneEnum.PARIS).toStrictEqual(`Europe/Paris`);
  });
});
