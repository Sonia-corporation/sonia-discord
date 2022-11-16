import { isDiscordThreadChannel } from './is-discord-thread-channel';
import { ThreadChannel } from 'discord.js';

describe(`isDiscordThreadChannel()`, (): void => {
  let channel: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordThreadChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordThreadChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      channel = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordThreadChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is an object`, (): void => {
    beforeEach((): void => {
      channel = {
        key: `value`,
      };
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordThreadChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "ThreadChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(ThreadChannel.prototype);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordThreadChannel(channel);

      expect(result).toBe(true);
    });
  });
});
