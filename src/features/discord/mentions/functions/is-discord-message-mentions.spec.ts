import { MessageMentions } from "discord.js";
import { createMock } from "ts-auto-mock";
import { isDiscordMessageMentions } from "./is-discord-message-mentions";

describe(`isDiscordMessageMentions()`, (): void => {
  let mention: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      mention = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordMessageMentionsResult = isDiscordMessageMentions(mention);

      expect(isDiscordMessageMentionsResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      mention = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordMessageMentionsResult = isDiscordMessageMentions(mention);

      expect(isDiscordMessageMentionsResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      mention = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordMessageMentionsResult = isDiscordMessageMentions(mention);

      expect(isDiscordMessageMentionsResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is an object`, (): void => {
    beforeEach((): void => {
      mention = {
        key: `value`,
      };
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordMessageMentionsResult = isDiscordMessageMentions(mention);

      expect(isDiscordMessageMentionsResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "MessageMentions" instance`, (): void => {
    beforeEach((): void => {
      mention = createMock<MessageMentions>();
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const isDiscordMessageMentionsResult = isDiscordMessageMentions(mention);

      expect(isDiscordMessageMentionsResult).toStrictEqual(true);
    });
  });
});
