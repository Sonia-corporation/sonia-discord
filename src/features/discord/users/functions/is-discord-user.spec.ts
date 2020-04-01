import { Client, User } from "discord.js";
import { isDiscordUser } from "./is-discord-user";

describe(`isDiscordUser()`, (): void => {
  let user: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      user = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      user = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      user = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toStrictEqual(false);
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

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "User" instance`, (): void => {
    beforeEach((): void => {
      // @todo replace with real mock
      user = new User(new Client(), {});
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordUser(user);

      expect(result).toStrictEqual(true);
    });
  });
});
