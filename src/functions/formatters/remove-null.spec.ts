import { removeNull } from "./remove-null";

describe(`removeNull()`, (): void => {
  let array: unknown[];

  describe(`when the given array is empty`, (): void => {
    beforeEach((): void => {
      array = [];
    });

    it(`should not change the array`, (): void => {
      expect.assertions(1);

      const result = removeNull(array);

      expect(result).toStrictEqual([]);
    });
  });

  describe(`when the given array is an array of strings`, (): void => {
    beforeEach((): void => {
      array = [`dummy`, `value`];
    });

    it(`should not change the array`, (): void => {
      expect.assertions(1);

      const result = removeNull(array);

      expect(result).toStrictEqual([`dummy`, `value`]);
    });
  });

  describe(`when the given array is an array of strings with null values`, (): void => {
    beforeEach((): void => {
      array = [`dummy`, null, `value`, null];
    });

    it(`should return the same array without the null values`, (): void => {
      expect.assertions(1);

      const result = removeNull(array);

      expect(result).toStrictEqual([`dummy`, `value`]);
    });
  });

  describe(`when the given array is an array of numbers`, (): void => {
    beforeEach((): void => {
      array = [1, 2];
    });

    it(`should not change the array`, (): void => {
      expect.assertions(1);

      const result = removeNull(array);

      expect(result).toStrictEqual([1, 2]);
    });
  });

  describe(`when the given array is an array of numbers with null values`, (): void => {
    beforeEach((): void => {
      array = [1, null, 2, null];
    });

    it(`should return the same array without the null values`, (): void => {
      expect.assertions(1);

      const result = removeNull(array);

      expect(result).toStrictEqual([1, 2]);
    });
  });
});
