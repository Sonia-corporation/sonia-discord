import { NUMERICAL_COLOR_MINT } from "./numerical-color-mint";

describe(`NUMERICAL_COLOR_MINT`, (): void => {
  it(`should be 7522991`, (): void => {
    expect.assertions(1);

    expect(NUMERICAL_COLOR_MINT).toStrictEqual(7522991);
  });
});
