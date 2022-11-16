import { isDiscordDmChannel } from './is-discord-dm-channel';
import { DMChannel, NewsChannel, TextChannel } from 'discord.js';

describe(`isDiscordDmChannel()`, (): void => {
  let channel: TextChannel | DMChannel | NewsChannel | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordDmChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordDmChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "DMChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(DMChannel.prototype);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordDmChannel(channel);

      expect(result).toBe(true);
    });
  });
});
