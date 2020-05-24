import { CHALK_INSTANCE } from "./chalk-instance";

describe(`CHALK`, (): void => {
  it(`should be a "Chalk" object`, (): void => {
    expect.assertions(1);

    expect(CHALK_INSTANCE).toStrictEqual(expect.any(Function));
  });
});
