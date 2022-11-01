import { NUMERICAL_COLOR_SUN } from './numerical-color-sun';

describe(`NUMERICAL_COLOR_SUN`, (): void => {
  it(`should be 16376750`, (): void => {
    expect.assertions(1);

    expect(NUMERICAL_COLOR_SUN).toBe(16376750);
  });
});
