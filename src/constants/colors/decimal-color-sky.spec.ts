import { DECIMAL_COLOR_SKY } from "./decimal-color-sky";

describe(`DECIMAL_COLOR_SKY`, (): void => {
  it(`should be 11912416`, (): void => {
    expect.assertions(1);

    expect(DECIMAL_COLOR_SKY).toStrictEqual(11912416);
  });
});
