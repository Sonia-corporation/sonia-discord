import { isDiscordTextChannel } from './is-discord-text-channel';
import {
  CategoryChannel,
  ChannelType,
  DMChannel,
  GuildBasedChannel,
  NewsChannel,
  StageChannel,
  TextBasedChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from 'discord.js';

describe(`isDiscordTextChannel()`, (): void => {
  let channel: GuildBasedChannel | TextBasedChannel | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "CategoryChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(CategoryChannel.prototype, {
        type: ChannelType.GuildCategory,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "DMChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(DMChannel.prototype, { type: ChannelType.DM });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "NewsChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "StageChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "TextChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(TextChannel.prototype, { type: ChannelType.GuildText });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is a "ThreadChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(ThreadChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "VoiceChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordTextChannel(channel);

      expect(result).toBe(false);
    });
  });
});
