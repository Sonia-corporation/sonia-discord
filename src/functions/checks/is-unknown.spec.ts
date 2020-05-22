import { isUnknown } from "./is-unknown";

describe(`isUnknown()`, (): void => {
  let value: string;

  describe(`when the given value is an empty string`, (): void => {
    beforeEach((): void => {
      value = ``;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isUnknownResult = isUnknown(value);

      expect(isUnknownResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is "dummy"`, (): void => {
    beforeEach((): void => {
      value = `dummy`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isUnknownResult = isUnknown(value);

      expect(isUnknownResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is "unknown"`, (): void => {
    beforeEach((): void => {
      value = `unknown`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isUnknownResult = isUnknown(value);

      expect(isUnknownResult).toStrictEqual(true);
    });
  });

  describe(`when the given value is "UNKNOWN"`, (): void => {
    beforeEach((): void => {
      value = `UNKNOWN`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isUnknownResult = isUnknown(value);

      expect(isUnknownResult).toStrictEqual(true);
    });
  });
});
