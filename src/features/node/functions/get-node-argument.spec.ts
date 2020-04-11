import { getNodeArgument } from "./get-node-argument";

describe(`getNodeArgument()`, (): void => {
  let name: string;

  describe(`when the command line has no arguments`, (): void => {
    beforeEach((): void => {
      process.argv = [];
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = getNodeArgument(name);

      expect(result).toBeNull();
    });
  });

  describe(`when the command line has arguments`, (): void => {
    beforeEach((): void => {
      process.argv = [`--argument1`, `value1`, `--argument2`, `value2`];
    });

    describe(`when the given name is an empty string`, (): void => {
      beforeEach((): void => {
        name = ``;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = getNodeArgument(name);

        expect(result).toBeNull();
      });
    });

    describe(`when the given name does not match an argument`, (): void => {
      beforeEach((): void => {
        name = `dummy-argument`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = getNodeArgument(name);

        expect(result).toBeNull();
      });
    });

    describe(`when the given name does match an argument`, (): void => {
      beforeEach((): void => {
        name = `argument1`;
      });

      it(`should return the argument value`, (): void => {
        expect.assertions(1);

        const result = getNodeArgument(name);

        expect(result).toStrictEqual(`value1`);
      });
    });
  });
});
