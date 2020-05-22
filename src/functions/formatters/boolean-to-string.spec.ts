import { booleanToString } from "./boolean-to-string";

describe(`booleanToString()`, (): void => {
  let isDummy: boolean;

  describe(`when the given value is false`, (): void => {
    beforeEach((): void => {
      isDummy = false;
    });

    it(`should return "false"`, (): void => {
      expect.assertions(1);

      const result = booleanToString(isDummy);

      expect(result).toStrictEqual(`false`);
    });
  });

  describe(`when the given value is true`, (): void => {
    beforeEach((): void => {
      isDummy = true;
    });

    it(`should return "true"`, (): void => {
      expect.assertions(1);

      const result = booleanToString(isDummy);

      expect(result).toStrictEqual(`true`);
    });
  });
});
