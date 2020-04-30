import { CHALK } from "./chalk";

describe(`CHALK`, (): void => {
  it(`should be a "Chalk" object`, (): void => {
    expect.assertions(1);

    expect(CHALK).toStrictEqual(expect.any(Object));
  });
});
