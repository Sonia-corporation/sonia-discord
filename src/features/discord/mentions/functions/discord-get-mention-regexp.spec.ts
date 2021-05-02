import { discordGetMentionRegexp } from './discord-get-mention-regexp';
import xregexp from 'xregexp';

describe(`discordGetMentionRegexp()`, (): void => {
  let message: string;

  it(`should return a regexp`, (): void => {
    expect.assertions(1);

    const result = discordGetMentionRegexp();

    // eslint-disable-next-line no-useless-escape
    expect(result).toStrictEqual(/<@!?\d+>/gim);
  });

  describe(`when tested with ""`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });

  describe(`when tested with "<"`, (): void => {
    beforeEach((): void => {
      message = `<`;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });

  describe(`when tested with "<>"`, (): void => {
    beforeEach((): void => {
      message = `<>`;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });

  describe(`when tested with "<@>"`, (): void => {
    beforeEach((): void => {
      message = `<@>`;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });

  describe(`when tested with "<@!>"`, (): void => {
    beforeEach((): void => {
      message = `<@!>`;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });

  describe(`when tested with "<@0>"`, (): void => {
    beforeEach((): void => {
      message = `<@0>`;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@0>`);
    });
  });

  describe(`when tested with "<@!0>"`, (): void => {
    beforeEach((): void => {
      message = `<@!0>`;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@!0>`);
    });
  });

  describe(`when tested with "<@0789>"`, (): void => {
    beforeEach((): void => {
      message = `<@0789>`;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@0789>`);
    });
  });

  describe(`when tested with "<@!0789>"`, (): void => {
    beforeEach((): void => {
      message = `<@!0789>`;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@!0789>`);
    });
  });

  describe(`when tested with "  <@0789>  "`, (): void => {
    beforeEach((): void => {
      message = `  <@0789>  `;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@0789>`);
    });
  });

  describe(`when tested with "  <@!0789>  "`, (): void => {
    beforeEach((): void => {
      message = `  <@!0789>  `;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@!0789>`);
    });
  });

  describe(`when tested with "<@123> <@456>"`, (): void => {
    beforeEach((): void => {
      message = `<@123> <@456>`;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@123>`);
    });
  });

  describe(`when tested with "<@!123> <@!456>"`, (): void => {
    beforeEach((): void => {
      message = `<@!123> <@!456>`;
    });

    it(`should find one mention`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)?.toString()).toStrictEqual(`<@!123>`);
    });
  });

  describe(`when tested with "<@dummy>"`, (): void => {
    beforeEach((): void => {
      message = `<@dummy>`;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });

  describe(`when tested with "<@!dummy>"`, (): void => {
    beforeEach((): void => {
      message = `<@!dummy>`;
    });

    it(`should find nothing`, (): void => {
      expect.assertions(1);

      const result = discordGetMentionRegexp();

      expect(xregexp.exec(message, result)).toBeNull();
    });
  });
});
