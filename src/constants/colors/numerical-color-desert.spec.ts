import { NUMERICAL_COLOR_DESERT } from './numerical-color-desert';

describe(`NUMERICAL_COLOR_DESERT`, (): void => {
  it(`should be 15718590`, (): void => {
    expect.assertions(1);

    expect(NUMERICAL_COLOR_DESERT).toStrictEqual(15718590);
  });
});
