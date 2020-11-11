import { NUMERICAL_COLOR_CANDY } from './numerical-color-candy';

describe(`NUMERICAL_COLOR_CANDY`, (): void => {
  it(`should be 15562905`, (): void => {
    expect.assertions(1);

    expect(NUMERICAL_COLOR_CANDY).toStrictEqual(15562905);
  });
});
