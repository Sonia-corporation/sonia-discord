import { DECIMAL_COLOR_SUN } from "./decimal-color-sun";

describe(`DECIMAL_COLOR_SUN`, (): void => {
  it(`should be 16376750`, (): void => {
    expect.assertions(1);

    expect(DECIMAL_COLOR_SUN).toStrictEqual(16376750);
  });
});
