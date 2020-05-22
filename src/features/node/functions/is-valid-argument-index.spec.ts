import { isValidArgumentIndex } from "./is-valid-argument-index";

describe(`isValidArgumentIndex()`, (): void => {
  let argumentIndex: number;

  describe(`when the given argument index is NaN`, (): void => {
    beforeEach((): void => {
      argumentIndex = NaN;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidArgumentIndexResult = isValidArgumentIndex(argumentIndex);

      expect(isValidArgumentIndexResult).toStrictEqual(false);
    });
  });

  describe(`when the given argument index is negative`, (): void => {
    describe(`when the given argument index is -8`, (): void => {
      beforeEach((): void => {
        argumentIndex = -8;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isValidArgumentIndexResult = isValidArgumentIndex(argumentIndex);

        expect(isValidArgumentIndexResult).toStrictEqual(false);
      });
    });

    describe(`when the given argument index is -1`, (): void => {
      beforeEach((): void => {
        argumentIndex = -1;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isValidArgumentIndexResult = isValidArgumentIndex(argumentIndex);

        expect(isValidArgumentIndexResult).toStrictEqual(false);
      });
    });
  });

  describe(`when the given argument index is positive`, (): void => {
    describe(`when the given argument index is 0`, (): void => {
      beforeEach((): void => {
        argumentIndex = 0;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isValidArgumentIndexResult = isValidArgumentIndex(argumentIndex);

        expect(isValidArgumentIndexResult).toStrictEqual(true);
      });
    });

    describe(`when the given argument index is 1`, (): void => {
      beforeEach((): void => {
        argumentIndex = 1;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isValidArgumentIndexResult = isValidArgumentIndex(argumentIndex);

        expect(isValidArgumentIndexResult).toStrictEqual(true);
      });
    });

    describe(`when the given argument index is 8`, (): void => {
      beforeEach((): void => {
        argumentIndex = 8;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isValidArgumentIndexResult = isValidArgumentIndex(argumentIndex);

        expect(isValidArgumentIndexResult).toStrictEqual(true);
      });
    });
  });
});
