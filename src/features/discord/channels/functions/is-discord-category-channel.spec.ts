import { isDiscordCategoryChannel } from './is-discord-category-channel';
import {
  CategoryChannel,
  DMChannel,
  GuildBasedChannel,
  NewsChannel,
  StageChannel,
  StoreChannel,
  TextBasedChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from 'discord.js';

describe(`isDiscordCategoryChannel()`, (): void => {
  let channel: GuildBasedChannel | TextBasedChannel | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "CategoryChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(CategoryChannel.prototype);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is a "DMChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(DMChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "NewsChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(NewsChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "StageChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(StageChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "StoreChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(StoreChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "TextChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(TextChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "ThreadChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(ThreadChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "VoiceChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createInstance(VoiceChannel.prototype);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordCategoryChannel(channel);

      expect(result).toBe(false);
    });
  });
});
