import { getNodeArgumentByIndex } from "./get-node-argument-by-index";

describe(`getNodeArgumentByIndex()`, (): void => {
  let argumentIndex: number;

  describe(`when the given argument index is NaN`, (): void => {
    beforeEach((): void => {
      argumentIndex = NaN;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = getNodeArgumentByIndex(argumentIndex);

      expect(result).toBeNull();
    });
  });

  describe(`when the given argument index is a negative number`, (): void => {
    describe(`when the given argument index is -8`, (): void => {
      beforeEach((): void => {
        argumentIndex = -8;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = getNodeArgumentByIndex(argumentIndex);

        expect(result).toBeNull();
      });
    });

    describe(`when the given argument index is -1`, (): void => {
      beforeEach((): void => {
        argumentIndex = -1;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = getNodeArgumentByIndex(argumentIndex);

        expect(result).toBeNull();
      });
    });
  });

  describe(`when the given argument index is a positive number`, (): void => {
    describe(`when the given argument index is 0`, (): void => {
      beforeEach((): void => {
        argumentIndex = 0;
      });

      describe(`when the command line as no arguments`, (): void => {
        beforeEach((): void => {
          process.argv = [];
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = getNodeArgumentByIndex(argumentIndex);

          expect(result).toBeNull();
        });
      });

      describe(`when the command line has arguments`, (): void => {
        describe(`when the node argument does not exist for this argument index`, (): void => {
          beforeEach((): void => {
            process.argv = [`--argument1`];
          });

          it(`should return the value associated with the given argument index`, (): void => {
            expect.assertions(1);

            const result = getNodeArgumentByIndex(argumentIndex);

            expect(result).toBeNull();
          });
        });

        describe(`when the node argument exist for this argument index`, (): void => {
          beforeEach((): void => {
            process.argv = [`--argument1`, `value1`];
          });

          it(`should return the value associated with the given argument index`, (): void => {
            expect.assertions(1);

            const result = getNodeArgumentByIndex(argumentIndex);

            expect(result).toStrictEqual(`value1`);
          });
        });
      });
    });

    describe(`when the given argument index is 2`, (): void => {
      beforeEach((): void => {
        argumentIndex = 2;
      });

      describe(`when the command line as no arguments`, (): void => {
        beforeEach((): void => {
          process.argv = [];
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = getNodeArgumentByIndex(argumentIndex);

          expect(result).toBeNull();
        });
      });

      describe(`when the command line has arguments`, (): void => {
        describe(`when the node argument does not exist for this argument index`, (): void => {
          beforeEach((): void => {
            process.argv = [`--argument1`, `value1`, `--argument2`];
          });

          it(`should return the value associated with the given argument index`, (): void => {
            expect.assertions(1);

            const result = getNodeArgumentByIndex(argumentIndex);

            expect(result).toBeNull();
          });
        });

        describe(`when the node argument exist for this argument index`, (): void => {
          beforeEach((): void => {
            process.argv = [`--argument1`, `value1`, `--argument2`, `value2`];
          });

          it(`should return the value associated with the given argument index`, (): void => {
            expect.assertions(1);

            const result = getNodeArgumentByIndex(argumentIndex);

            expect(result).toStrictEqual(`value2`);
          });
        });
      });
    });
  });
});
