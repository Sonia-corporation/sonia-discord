import xregexp from "xregexp";
import { getInterpolationRegexp } from "./get-interpolation-regexp";

describe(`getInterpolationRegexp()`, (): void => {
  let value: string;
  let text: string;

  describe(`when the given value is userId`, (): void => {
    beforeEach((): void => {
      value = `userId`;
    });

    it(`should return a regexp`, (): void => {
      expect.assertions(1);

      const result = getInterpolationRegexp(value);

      expect(result).toStrictEqual(/{{\s?userid\s?}}/gim);
    });

    describe(`when tested with a simple text without interpolation`, (): void => {
      beforeEach((): void => {
        text = `simple text`;
      });

      it(`should not match`, (): void => {
        expect.assertions(1);

        const result = getInterpolationRegexp(value);

        expect(xregexp.test(text, result)).toStrictEqual(false);
      });
    });

    describe(`when tested with a simple text with cookie interpolation`, (): void => {
      beforeEach((): void => {
        text = `{{ cookie }}`;
      });

      it(`should not match`, (): void => {
        expect.assertions(1);

        const result = getInterpolationRegexp(value);

        expect(xregexp.test(text, result)).toStrictEqual(false);
      });
    });

    describe(`when tested with a simple text with userId interpolation`, (): void => {
      beforeEach((): void => {
        text = `{{ userId }}`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getInterpolationRegexp(value);

        expect(xregexp.test(text, result)).toStrictEqual(true);
      });
    });

    describe(`when tested with a simple text with userId interpolation without space`, (): void => {
      beforeEach((): void => {
        text = `{{userId}}`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getInterpolationRegexp(value);

        expect(xregexp.test(text, result)).toStrictEqual(true);
      });
    });

    describe(`when tested with a simple text with userId interpolation lower case`, (): void => {
      beforeEach((): void => {
        text = `{{userid}}`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getInterpolationRegexp(value);

        expect(xregexp.test(text, result)).toStrictEqual(true);
      });
    });
  });
});
