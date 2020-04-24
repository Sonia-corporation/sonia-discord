import { IconEnum } from "./icon.enum";

describe(`IconEnum`, (): void => {
  it(`should have a member "ARTIFICIAL_INTELLIGENCE"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.ARTIFICIAL_INTELLIGENCE).toStrictEqual(
      `https://i.ibb.co/ph17BqP/icons8-artificial-intelligence-512.png`
    );
  });

  it(`should have a member "COOKIES"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.COOKIES).toStrictEqual(
      `https://i.ibb.co/RTp4YPx/icons8-cookies-512.png`
    );
  });

  it(`should have a member "ERROR"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.ERROR).toStrictEqual(
      `https://i.ibb.co/5jZmzSB/icons8-error-512.png`
    );
  });

  it(`should have a member "INFORMATION"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.INFORMATION).toStrictEqual(
      `https://i.ibb.co/vLSnVk6/icons8-information-512.png`
    );
  });

  it(`should have a member "BUG"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.BUG).toStrictEqual(
      `https://i.ibb.co/r7PHJS1/icons8-bug-512.png`
    );
  });

  it(`should have a member "GIRL"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.GIRL).toStrictEqual(
      `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`
    );
  });

  it(`should have a member "WARNING_SHIELD"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.WARNING_SHIELD).toStrictEqual(
      `https://i.ibb.co/41ccwXn/icons8-warning-shield-512.png`
    );
  });
});
