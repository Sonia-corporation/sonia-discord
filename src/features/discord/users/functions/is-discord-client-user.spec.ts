import { ClientUser } from "discord.js";
import { createMock } from "ts-auto-mock";
import { isDiscordClientUser } from "./is-discord-client-user";

describe(`isDiscordClientUser()`, (): void => {
  let user: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      user = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordClientUserResult = isDiscordClientUser(user);

      expect(isDiscordClientUserResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      user = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordClientUserResult = isDiscordClientUser(user);

      expect(isDiscordClientUserResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      user = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordClientUserResult = isDiscordClientUser(user);

      expect(isDiscordClientUserResult).toStrictEqual(false);
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

      const isDiscordClientUserResult = isDiscordClientUser(user);

      expect(isDiscordClientUserResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "ClientUser" instance`, (): void => {
    beforeEach((): void => {
      user = createMock<ClientUser>();
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const isDiscordClientUserResult = isDiscordClientUser(user);

      expect(isDiscordClientUserResult).toStrictEqual(true);
    });
  });
});
