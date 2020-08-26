import { getRandomBoolean } from "./get-random-boolean";

describe(`getRandomBoolean()`, (): void => {
  it(`should return true or false`, (): void => {
    expect.assertions(1);

    const isTrue = getRandomBoolean();

    expect(isTrue).toBeOneOf([true, false]);
  });
});
