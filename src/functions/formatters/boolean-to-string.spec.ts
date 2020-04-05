import { booleanToString } from "./boolean-to-string";

describe(`booleanToString()`, (): void => {
  let value: boolean;

  describe(`when the given value is false`, (): void => {
    beforeEach((): void => {
      value = false;
    });

    it(`should return "false"`, (): void => {
      expect.assertions(1);

      const result = booleanToString(value);

      expect(result).toStrictEqual(`false`);
    });
  });

  describe(`when the given value is true`, (): void => {
    beforeEach((): void => {
      value = true;
    });

    it(`should return "true"`, (): void => {
      expect.assertions(1);

      const result = booleanToString(value);

      expect(result).toStrictEqual(`true`);
    });
  });
});
