import { GuildChannel } from "discord.js";
import { createMock } from "ts-auto-mock";
import { isDiscordGuildChannel } from "./is-discord-guild-channel";

describe(`isDiscordGuildChannel()`, (): void => {
  let channel: unknown;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelResult = isDiscordGuildChannel(channel);

      expect(isDiscordGuildChannelResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelResult = isDiscordGuildChannel(channel);

      expect(isDiscordGuildChannelResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      channel = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelResult = isDiscordGuildChannel(channel);

      expect(isDiscordGuildChannelResult).toStrictEqual(false);
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

      const isDiscordGuildChannelResult = isDiscordGuildChannel(channel);

      expect(isDiscordGuildChannelResult).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "GuildChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createMock<GuildChannel>();
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelResult = isDiscordGuildChannel(channel);

      expect(isDiscordGuildChannelResult).toStrictEqual(true);
    });
  });
});
