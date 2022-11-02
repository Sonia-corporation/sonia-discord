import { isDiscordGuild } from './is-discord-guild';
import { Guild } from 'discord.js';

describe(`isDiscordGuild()`, (): void => {
  let guild: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      guild = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuild(guild);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      guild = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuild(guild);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      guild = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuild(guild);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is an object`, (): void => {
    beforeEach((): void => {
      guild = {
        key: `value`,
      };
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuild(guild);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is a "Guild" instance`, (): void => {
    beforeEach((): void => {
      guild = createInstance(Guild.prototype);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuild(guild);

      expect(result).toBeTrue();
    });
  });
});
