import { DECIMAL_COLOR_MINT } from "./decimal-color-mint";

describe(`DECIMAL_COLOR_MINT`, (): void => {
  it(`should be 7522991`, (): void => {
    expect.assertions(1);

    expect(DECIMAL_COLOR_MINT).toStrictEqual(7522991);
  });
});
