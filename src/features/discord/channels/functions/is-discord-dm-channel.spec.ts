import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import { createMock } from "ts-auto-mock";
import { isDiscordDmChannel } from "./is-discord-dm-channel";

describe(`isDiscordDmChannel()`, (): void => {
  let channel: TextChannel | DMChannel | NewsChannel | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordDmChannel(channel);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordDmChannel(channel);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a "DMChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createMock<DMChannel>();
    });

    // @todo fix it omg this should works
    it.skip(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordDmChannel(channel);

      expect(result).toStrictEqual(true);
    });
  });
});
