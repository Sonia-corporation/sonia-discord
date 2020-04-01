import { getArgumentIndex } from "./get-argument-index";

describe(`getArgumentIndex()`, (): void => {
  let name: string;

  describe(`when the command line arguments is empty`, (): void => {
    beforeEach((): void => {
      process.argv = [];
    });

    it(`should return -1`, (): void => {
      expect.assertions(1);

      const result = getArgumentIndex(name);

      expect(result).toStrictEqual(-1);
    });
  });

  describe(`when the command line arguments contain multiple lowercase arguments`, (): void => {
    beforeEach((): void => {
      process.argv = [`--argument1`, `--argument2`, `--argument3`];
    });

    describe(`when the given argument name is not in the command line arguments`, (): void => {
      beforeEach((): void => {
        name = `dummy`;
      });

      it(`should return -1`, (): void => {
        expect.assertions(1);

        const result = getArgumentIndex(name);

        expect(result).toStrictEqual(-1);
      });
    });

    describe(`when the given argument name is in the command line arguments with "--" prefix`, (): void => {
      describe(`when the given argument name is the first command line argument`, (): void => {
        beforeEach((): void => {
          name = `--argument1`;
        });

        it(`should return -1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(-1);
        });
      });

      describe(`when the given argument name is the second command line argument`, (): void => {
        beforeEach((): void => {
          name = `--argument2`;
        });

        it(`should return -1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(-1);
        });
      });

      describe(`when the given argument name is the third command line argument`, (): void => {
        beforeEach((): void => {
          name = `--argument3`;
        });

        it(`should return -1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(-1);
        });
      });
    });

    describe(`when the given argument name is in the command line arguments without "--" prefix`, (): void => {
      describe(`when the given argument name is the first command line argument`, (): void => {
        beforeEach((): void => {
          name = `argument1`;
        });

        it(`should return 0`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(0);
        });
      });

      describe(`when the given argument name is the second command line argument`, (): void => {
        beforeEach((): void => {
          name = `argument2`;
        });

        it(`should return 1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(1);
        });
      });

      describe(`when the given argument name is the third command line argument`, (): void => {
        beforeEach((): void => {
          name = `argument3`;
        });

        it(`should return 2`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(2);
        });
      });
    });

    describe(`when the given argument name is in the command line arguments without "--" prefix and with uppercase`, (): void => {
      describe(`when the given argument name is the first command line argument`, (): void => {
        beforeEach((): void => {
          name = `ARGUMENT1`;
        });

        it(`should return 0`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(0);
        });
      });

      describe(`when the given argument name is the second command line argument`, (): void => {
        beforeEach((): void => {
          name = `ARGUMENT2`;
        });

        it(`should return 1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(1);
        });
      });

      describe(`when the given argument name is the third command line argument`, (): void => {
        beforeEach((): void => {
          name = `ARGUMENT3`;
        });

        it(`should return 2`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(2);
        });
      });
    });
  });

  describe(`when the command line arguments contain multiple uppercase arguments`, (): void => {
    beforeEach((): void => {
      process.argv = [`--ARGUMENT1`, `--ARGUMENT2`, `--ARGUMENT3`];
    });

    describe(`when the given argument name is not in the command line arguments`, (): void => {
      beforeEach((): void => {
        name = `dummy`;
      });

      it(`should return -1`, (): void => {
        expect.assertions(1);

        const result = getArgumentIndex(name);

        expect(result).toStrictEqual(-1);
      });
    });

    describe(`when the given argument name is in the command line arguments with "--" prefix`, (): void => {
      describe(`when the given argument name is the first command line argument`, (): void => {
        beforeEach((): void => {
          name = `--argument1`;
        });

        it(`should return -1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(-1);
        });
      });

      describe(`when the given argument name is the second command line argument`, (): void => {
        beforeEach((): void => {
          name = `--argument2`;
        });

        it(`should return -1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(-1);
        });
      });

      describe(`when the given argument name is the third command line argument`, (): void => {
        beforeEach((): void => {
          name = `--argument3`;
        });

        it(`should return -1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(-1);
        });
      });
    });

    describe(`when the given argument name is in the command line arguments without "--" prefix`, (): void => {
      describe(`when the given argument name is the first command line argument`, (): void => {
        beforeEach((): void => {
          name = `argument1`;
        });

        it(`should return 0`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(0);
        });
      });

      describe(`when the given argument name is the second command line argument`, (): void => {
        beforeEach((): void => {
          name = `argument2`;
        });

        it(`should return 1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(1);
        });
      });

      describe(`when the given argument name is the third command line argument`, (): void => {
        beforeEach((): void => {
          name = `argument3`;
        });

        it(`should return 2`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(2);
        });
      });
    });

    describe(`when the given argument name is in the command line arguments without "--" prefix and with uppercase`, (): void => {
      describe(`when the given argument name is the first command line argument`, (): void => {
        beforeEach((): void => {
          name = `ARGUMENT1`;
        });

        it(`should return 0`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(0);
        });
      });

      describe(`when the given argument name is the second command line argument`, (): void => {
        beforeEach((): void => {
          name = `ARGUMENT2`;
        });

        it(`should return 1`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(1);
        });
      });

      describe(`when the given argument name is the third command line argument`, (): void => {
        beforeEach((): void => {
          name = `ARGUMENT3`;
        });

        it(`should return 2`, (): void => {
          expect.assertions(1);

          const result = getArgumentIndex(name);

          expect(result).toStrictEqual(2);
        });
      });
    });
  });
});
