import { removeUndefined } from "./remove-undefined";

describe(`removeUndefined()`, (): void => {
  let array: unknown[];

  describe(`when the given array is empty`, (): void => {
    beforeEach((): void => {
      array = [];
    });

    it(`should not change the array`, (): void => {
      expect.assertions(1);

      const result = removeUndefined(array);

      expect(result).toStrictEqual([]);
    });
  });

  describe(`when the given array is an array of strings`, (): void => {
    beforeEach((): void => {
      array = [`dummy`, `value`];
    });

    it(`should not change the array`, (): void => {
      expect.assertions(1);

      const result = removeUndefined(array);

      expect(result).toStrictEqual([`dummy`, `value`]);
    });
  });

  describe(`when the given array is an array of strings with undefined values`, (): void => {
    beforeEach((): void => {
      array = [`dummy`, undefined, `value`, undefined];
    });

    it(`should return the same array without the undefined values`, (): void => {
      expect.assertions(1);

      const result = removeUndefined(array);

      expect(result).toStrictEqual([`dummy`, `value`]);
    });
  });

  describe(`when the given array is an array of numbers`, (): void => {
    beforeEach((): void => {
      array = [1, 2];
    });

    it(`should not change the array`, (): void => {
      expect.assertions(1);

      const result = removeUndefined(array);

      expect(result).toStrictEqual([1, 2]);
    });
  });

  describe(`when the given array is an array of numbers with undefined values`, (): void => {
    beforeEach((): void => {
      array = [1, undefined, 2, undefined];
    });

    it(`should return the same array without the undefined values`, (): void => {
      expect.assertions(1);

      const result = removeUndefined(array);

      expect(result).toStrictEqual([1, 2]);
    });
  });
});
