import { wrapInQuotes } from "./wrap-in-quotes";

describe(`wrapInQuotes()`, (): void => {
  let value: string;
  let quotes: string;

  describe(`when the given value is an empty string`, (): void => {
    beforeEach((): void => {
      value = ``;
    });

    it(`should return """"`, (): void => {
      expect.assertions(1);

      const result = wrapInQuotes(value);

      expect(result).toStrictEqual(`""`);
    });

    describe(`when the given quotes is """`, (): void => {
      beforeEach((): void => {
        quotes = `"`;
      });

      it(`should return """"`, (): void => {
        expect.assertions(1);

        const result = wrapInQuotes(value, quotes);

        expect(result).toStrictEqual(`""`);
      });
    });

    describe(`when the given quotes is "**"`, (): void => {
      beforeEach((): void => {
        quotes = `**`;
      });

      it(`should return "****"`, (): void => {
        expect.assertions(1);

        const result = wrapInQuotes(value, quotes);

        expect(result).toStrictEqual(`****`);
      });
    });
  });

  describe(`when the given value is "dummy"`, (): void => {
    beforeEach((): void => {
      value = `dummy`;
    });

    it(`should return ""dummy""`, (): void => {
      expect.assertions(1);

      const result = wrapInQuotes(value);

      expect(result).toStrictEqual(`"dummy"`);
    });

    describe(`when the given quotes is """`, (): void => {
      beforeEach((): void => {
        quotes = `"`;
      });

      it(`should return ""dummy""`, (): void => {
        expect.assertions(1);

        const result = wrapInQuotes(value, quotes);

        expect(result).toStrictEqual(`"dummy"`);
      });
    });

    describe(`when the given quotes is "**"`, (): void => {
      beforeEach((): void => {
        quotes = `**`;
      });

      it(`should return "**dummy**"`, (): void => {
        expect.assertions(1);

        const result = wrapInQuotes(value, quotes);

        expect(result).toStrictEqual(`**dummy**`);
      });
    });
  });

  describe(`when the given value is "hello, world!"`, (): void => {
    beforeEach((): void => {
      value = `hello, world!`;
    });

    it(`should return ""hello, world!""`, (): void => {
      expect.assertions(1);

      const result = wrapInQuotes(value);

      expect(result).toStrictEqual(`"hello, world!"`);
    });

    describe(`when the given quotes is """`, (): void => {
      beforeEach((): void => {
        quotes = `"`;
      });

      it(`should return ""hello, world!""`, (): void => {
        expect.assertions(1);

        const result = wrapInQuotes(value, quotes);

        expect(result).toStrictEqual(`"hello, world!"`);
      });
    });

    describe(`when the given quotes is "**"`, (): void => {
      beforeEach((): void => {
        quotes = `**`;
      });

      it(`should return "**hello, world!**"`, (): void => {
        expect.assertions(1);

        const result = wrapInQuotes(value, quotes);

        expect(result).toStrictEqual(`**hello, world!**`);
      });
    });
  });
});
