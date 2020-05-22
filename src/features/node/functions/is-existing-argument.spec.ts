import { isExistingArgument } from "./is-existing-argument";

describe(`isExistingArgument()`, (): void => {
  let argumentIndex: number;

  describe(`when the given argument index is 0`, (): void => {
    beforeEach((): void => {
      argumentIndex = 0;
    });

    describe(`when the command line has no argument`, (): void => {
      beforeEach((): void => {
        process.argv = [];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(false);
      });
    });

    describe(`when the command line has one argument`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`];
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(true);
      });
    });

    describe(`when the command line has two arguments`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`, `value1`];
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(true);
      });
    });
  });

  describe(`when the given argument index is 1`, (): void => {
    beforeEach((): void => {
      argumentIndex = 1;
    });

    describe(`when the command line has no argument`, (): void => {
      beforeEach((): void => {
        process.argv = [];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(false);
      });
    });

    describe(`when the command line has one argument`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(false);
      });
    });

    describe(`when the command line has two arguments`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`, `value1`];
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(true);
      });
    });
  });

  describe(`when the given argument index is 2`, (): void => {
    beforeEach((): void => {
      argumentIndex = 2;
    });

    describe(`when the command line has no argument`, (): void => {
      beforeEach((): void => {
        process.argv = [];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(false);
      });
    });

    describe(`when the command line has one argument`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(false);
      });
    });

    describe(`when the command line has two arguments`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`, `value1`];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isExistingArgumentResult = isExistingArgument(argumentIndex);

        expect(isExistingArgumentResult).toStrictEqual(false);
      });
    });
  });
});
