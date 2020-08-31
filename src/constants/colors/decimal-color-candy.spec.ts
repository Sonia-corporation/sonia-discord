import { DECIMAL_COLOR_CANDY } from "./decimal-color-candy";

describe(`DECIMAL_COLOR_CANDY`, (): void => {
  it(`should be 15562905`, (): void => {
    expect.assertions(1);

    expect(DECIMAL_COLOR_CANDY).toStrictEqual(15562905);
  });
});
