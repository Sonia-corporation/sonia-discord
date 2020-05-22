import { isNodeProduction } from "./is-node-production";

describe(`isNodeProduction()`, (): void => {
  describe(`when the command line has no arguments`, (): void => {
    beforeEach((): void => {
      process.argv = [];
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isNodeProductionResult = isNodeProduction();

      expect(isNodeProductionResult).toStrictEqual(false);
    });
  });

  describe(`when the command line has arguments`, (): void => {
    describe(`when the command line has no argument matching "prod"`, (): void => {
      beforeEach((): void => {
        process.argv = [`--argument1`, `value1`, `--argument2`, `value2`];
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isNodeProductionResult = isNodeProduction();

        expect(isNodeProductionResult).toStrictEqual(false);
      });
    });

    describe(`when the command line has an argument matching "prod"`, (): void => {
      describe(`when the prod command line argument value does not exist`, (): void => {
        beforeEach((): void => {
          process.argv = [`--argument1`, `value1`, `--prod`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const isNodeProductionResult = isNodeProduction();

          expect(isNodeProductionResult).toStrictEqual(false);
        });
      });

      describe(`when the prod command line argument value does exists`, (): void => {
        describe(`when the prod command line argument value is "true"`, (): void => {
          beforeEach((): void => {
            process.argv = [`--argument1`, `value1`, `--prod`, `true`];
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const isNodeProductionResult = isNodeProduction();

            expect(isNodeProductionResult).toStrictEqual(true);
          });
        });

        describe(`when the prod command line argument value is "false"`, (): void => {
          beforeEach((): void => {
            process.argv = [`--argument1`, `value1`, `--prod`, `false`];
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const isNodeProductionResult = isNodeProduction();

            expect(isNodeProductionResult).toStrictEqual(false);
          });
        });
      });
    });
  });
});
