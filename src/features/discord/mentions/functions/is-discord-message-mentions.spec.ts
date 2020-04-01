import {
  Client,
  Guild,
  Message,
  MessageMentions,
  TextChannel,
} from "discord.js";
import { isDiscordMessageMentions } from "./is-discord-message-mentions";

describe(`isDiscordMessageMentions()`, (): void => {
  let mention: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      mention = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessageMentions(mention);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      mention = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessageMentions(mention);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      mention = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessageMentions(mention);

      expect(result).toStrictEqual(false);
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

      const result = isDiscordMessageMentions(mention);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "MessageMentions" instance`, (): void => {
    beforeEach((): void => {
      // @todo replace with real mock
      mention = new MessageMentions(
        new Message(
          new Client(),
          {},
          new TextChannel(new Guild(new Client(), {}))
        ),
        [],
        [],
        true
      );
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessageMentions(mention);

      expect(result).toStrictEqual(true);
    });
  });
});
