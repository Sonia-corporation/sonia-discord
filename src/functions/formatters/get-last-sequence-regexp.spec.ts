import { getLastSequenceRegexp } from './get-last-sequence-regexp';
import xregexp from 'xregexp';

describe(`getLastSequenceRegexp()`, (): void => {
  let value: string;
  let text: string;

  describe(`when the given value is "userId"`, (): void => {
    beforeEach((): void => {
      value = `userId`;
    });

    it(`should return a regexp`, (): void => {
      expect.assertions(1);

      const result = getLastSequenceRegexp(value);

      expect(result).toStrictEqual(/(userId)(?!.*(userId))/gim);
    });

    describe(`when tested with a simple text`, (): void => {
      beforeEach((): void => {
        text = `simple text`;
      });

      it(`should not match`, (): void => {
        expect.assertions(1);

        const result = getLastSequenceRegexp(value);

        expect(xregexp.test(text, result)).toBe(false);
      });
    });

    describe(`when tested with a text containing the given value`, (): void => {
      beforeEach((): void => {
        text = `simple text with a userId`;
      });

      it(`should match the given value`, (): void => {
        expect.assertions(1);

        const result = getLastSequenceRegexp(value);

        expect(xregexp.test(text, result)).toBe(true);
      });
    });

    describe(`when tested with a text containing the given value multiple times`, (): void => {
      beforeEach((): void => {
        text = `simple text with a userId and another userId`;
      });

      it(`should match the last given value`, (): void => {
        expect.assertions(1);

        const result = getLastSequenceRegexp(value);

        expect(xregexp.test(text, result)).toBe(true);
      });

      it(`should can able to replace on the last given value`, (): void => {
        expect.assertions(1);

        const result = getLastSequenceRegexp(value);

        expect(xregexp.replace(text, result, `dummy`)).toBe(`simple text with a userId and another dummy`);
      });
    });
  });
});
