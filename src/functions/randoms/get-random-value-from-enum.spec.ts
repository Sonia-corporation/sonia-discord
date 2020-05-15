import { getRandomValueFromEnum } from "./get-random-value-from-enum";

enum DummyEmptyEnum {}

enum DummyStringsEnum {
  MARCO = `not-marco`,
  POLO = `not-polo`,
}

enum DummyNumbersEnum {
  MARCO = 0,
  POLO = 1,
}

describe(`getRandomValueFromEnum()`, (): void => {
  describe(`when the given enum is empty`, (): void => {
    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = getRandomValueFromEnum(DummyEmptyEnum);

      expect(result).toBeUndefined();
    });
  });

  describe(`when the given enum is an enum of strings`, (): void => {
    it(`should return either "not-marco" or "not-polo"`, (): void => {
      expect.assertions(1);

      const result = getRandomValueFromEnum(DummyStringsEnum);

      expect(result === `not-marco` || result === `not-polo`).toStrictEqual(
        true
      );
    });

    it(`should return either "not-marco" or "not-polo" when casted as string`, (): void => {
      expect.assertions(1);

      const result = getRandomValueFromEnum<string>(DummyStringsEnum);

      expect(result === `not-marco` || result === `not-polo`).toStrictEqual(
        true
      );
    });
  });

  describe(`when the given enum is an enum of numbers`, (): void => {
    it(`should return either 0 or 1 or "MARCO" or "POLO"`, (): void => {
      expect.assertions(1);

      const result = getRandomValueFromEnum<string | number>(DummyNumbersEnum);

      expect(
        result === 0 || result === 1 || result === `MARCO` || result === `POLO`
      ).toStrictEqual(true);
    });
  });
});
