import { isDiscordUser } from './is-discord-user';
import { User } from 'discord.js';

describe(`isDiscordUser()`, (): void => {
  let user: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      user = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      user = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      user = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is an object`, (): void => {
    beforeEach((): void => {
      user = {
        key: `value`,
      };
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is a "User" instance`, (): void => {
    beforeEach((): void => {
      user = createInstance(User.prototype);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toBeTrue();
    });
  });
});
