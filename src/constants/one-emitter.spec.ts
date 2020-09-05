import { ONE_EMITTER } from "./one-emitter";

describe(`ONE_EMITTER`, (): void => {
  it(`should be 1`, (): void => {
    expect.assertions(1);

    expect(ONE_EMITTER).toStrictEqual(1);
  });
});
