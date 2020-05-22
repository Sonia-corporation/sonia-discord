import moment from "moment-timezone";
import { isValidDate } from "./is-valid-date";

describe(`isValidDate()`, (): void => {
  let date: string;

  describe(`when the given date is an empty string`, (): void => {
    beforeEach((): void => {
      date = ``;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidDateResult = isValidDate(date);

      expect(isValidDateResult).toStrictEqual(false);
    });
  });

  describe(`when the given date is "unknown"`, (): void => {
    beforeEach((): void => {
      date = `unknown`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidDateResult = isValidDate(date);

      expect(isValidDateResult).toStrictEqual(false);
    });
  });

  describe(`when the given date is "UNKNOWN"`, (): void => {
    beforeEach((): void => {
      date = `UNKNOWN`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidDateResult = isValidDate(date);

      expect(isValidDateResult).toStrictEqual(false);
    });
  });

  describe(`when the given date is "today"`, (): void => {
    beforeEach((): void => {
      date = `today`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidDateResult = isValidDate(date);

      expect(isValidDateResult).toStrictEqual(false);
    });
  });

  describe(`when the given date is a date as ISO string`, (): void => {
    beforeEach((): void => {
      date = moment().format();
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isValidDateResult = isValidDate(date);

      expect(isValidDateResult).toStrictEqual(true);
    });
  });
});
