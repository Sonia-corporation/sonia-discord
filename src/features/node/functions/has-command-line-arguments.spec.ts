import { hasCommandLineArguments } from "./has-command-line-arguments";

describe(`hasCommandLineArguments()`, (): void => {
  describe(`when process is valid`, (): void => {
    describe(`when process argv is undefined`, (): void => {
      beforeEach((): void => {
        (process.argv as unknown) = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const hasCommandLineArgumentsResult = hasCommandLineArguments();

        expect(hasCommandLineArgumentsResult).toStrictEqual(false);
      });
    });

    describe(`when process argv is null`, (): void => {
      beforeEach((): void => {
        (process.argv as unknown) = null;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const hasCommandLineArgumentsResult = hasCommandLineArguments();

        expect(hasCommandLineArgumentsResult).toStrictEqual(false);
      });
    });

    describe(`when process argv is an empty array`, (): void => {
      beforeEach((): void => {
        process.argv = [];
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const hasCommandLineArgumentsResult = hasCommandLineArguments();

        expect(hasCommandLineArgumentsResult).toStrictEqual(true);
      });
    });

    describe(`when process argv is an array of string`, (): void => {
      beforeEach((): void => {
        process.argv = [`dummy`];
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const hasCommandLineArgumentsResult = hasCommandLineArguments();

        expect(hasCommandLineArgumentsResult).toStrictEqual(true);
      });
    });
  });
});
