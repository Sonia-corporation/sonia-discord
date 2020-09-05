import { NUMERICAL_COLOR_SKY } from "./numerical-color-sky";

describe(`NUMERICAL_COLOR_SKY`, (): void => {
  it(`should be 11912416`, (): void => {
    expect.assertions(1);

    expect(NUMERICAL_COLOR_SKY).toStrictEqual(11912416);
  });
});
