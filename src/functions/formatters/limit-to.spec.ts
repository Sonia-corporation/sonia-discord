import { limitTo } from "./limit-to";

describe(`limitTo()`, (): void => {
  let value: string;
  let limit: number;

  describe(`when the given value is an empty string`, (): void => {
    beforeEach((): void => {
      value = ``;
    });

    it(`should return the given value`, (): void => {
      expect.assertions(1);

      const result = limitTo(value);

      expect(result).toStrictEqual(``);
    });
  });

  describe(`when the given value is a string of 10 characters`, (): void => {
    beforeEach((): void => {
      value = `0123456789`;
    });

    it(`should return the given value`, (): void => {
      expect.assertions(1);

      const result = limitTo(value);

      expect(result).toStrictEqual(`0123456789`);
    });

    describe(`when the given limit is 8`, (): void => {
      beforeEach((): void => {
        limit = 8;
      });

      it(`should return the first 8 characters`, (): void => {
        expect.assertions(1);

        const result = limitTo(value, limit);

        expect(result).toStrictEqual(`01234567`);
      });
    });

    describe(`when the given limit is 9`, (): void => {
      beforeEach((): void => {
        limit = 9;
      });

      it(`should return the first 9 characters`, (): void => {
        expect.assertions(1);

        const result = limitTo(value, limit);

        expect(result).toStrictEqual(`012345678`);
      });
    });

    describe(`when the given limit is 10`, (): void => {
      beforeEach((): void => {
        limit = 10;
      });

      it(`should return the given value`, (): void => {
        expect.assertions(1);

        const result = limitTo(value, limit);

        expect(result).toStrictEqual(`0123456789`);
      });
    });

    describe(`when the given limit is 11`, (): void => {
      beforeEach((): void => {
        limit = 11;
      });

      it(`should return the given value`, (): void => {
        expect.assertions(1);

        const result = limitTo(value, limit);

        expect(result).toStrictEqual(`0123456789`);
      });
    });
  });
});
