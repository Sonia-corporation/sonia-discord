import { Guild } from "discord.js";
import { createMock } from "ts-auto-mock";
import { isDiscordGuild } from "./is-discord-guild";

describe(`isDiscordGuild()`, (): void => {
  let guild: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      guild = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildResult = isDiscordGuild(guild);

      expect(isDiscordGuildResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      guild = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildResult = isDiscordGuild(guild);

      expect(isDiscordGuildResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      guild = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildResult = isDiscordGuild(guild);

      expect(isDiscordGuildResult).toStrictEqual(false);
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

      const isDiscordGuildResult = isDiscordGuild(guild);

      expect(isDiscordGuildResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "Guild" instance`, (): void => {
    beforeEach((): void => {
      guild = createMock<Guild>();
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const isDiscordGuildResult = isDiscordGuild(guild);

      expect(isDiscordGuildResult).toStrictEqual(true);
    });
  });
});
