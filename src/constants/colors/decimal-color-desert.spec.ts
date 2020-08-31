import { DECIMAL_COLOR_DESERT } from "./decimal-color-desert";

describe(`DECIMAL_COLOR_DESERT`, (): void => {
  it(`should be 15718590`, (): void => {
    expect.assertions(1);

    expect(DECIMAL_COLOR_DESERT).toStrictEqual(15718590);
  });
});
