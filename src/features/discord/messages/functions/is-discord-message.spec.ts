import { isDiscordMessage } from './is-discord-message';
import { Message } from 'discord.js';

describe(`isDiscordMessage()`, (): void => {
  let message: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      message = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessage(message);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      message = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessage(message);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      message = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessage(message);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is an object`, (): void => {
    beforeEach((): void => {
      message = {
        key: `value`,
      };
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessage(message);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "Message" instance`, (): void => {
    beforeEach((): void => {
      message = createInstance(Message.prototype);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordMessage(message);

      expect(result).toStrictEqual(true);
    });
  });
});
