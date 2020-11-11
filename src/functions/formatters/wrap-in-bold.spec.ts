import { wrapInBold } from './wrap-in-bold';

describe(`wrapInBold()`, (): void => {
  let value: string;

  describe(`when the given value is an empty string`, (): void => {
    beforeEach((): void => {
      value = ``;
    });

    it(`should return "****"`, (): void => {
      expect.assertions(1);

      const result = wrapInBold(value);

      expect(result).toStrictEqual(`****`);
    });
  });

  describe(`when the given value is "dummy"`, (): void => {
    beforeEach((): void => {
      value = `dummy`;
    });

    it(`should return "**dummy**"`, (): void => {
      expect.assertions(1);

      const result = wrapInBold(value);

      expect(result).toStrictEqual(`**dummy**`);
    });
  });

  describe(`when the given value is "hello, world!"`, (): void => {
    beforeEach((): void => {
      value = `hello, world!`;
    });

    it(`should return "**hello, world!**"`, (): void => {
      expect.assertions(1);

      const result = wrapInBold(value);

      expect(result).toStrictEqual(`**hello, world!**`);
    });
  });
});
