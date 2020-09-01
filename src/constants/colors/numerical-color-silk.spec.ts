import { NUMERICAL_COLOR_SILK } from "./numerical-color-silk";

describe(`NUMERICAL_COLOR_SILK`, (): void => {
  it(`should be 14082034`, (): void => {
    expect.assertions(1);

    expect(NUMERICAL_COLOR_SILK).toStrictEqual(14082034);
  });
});
