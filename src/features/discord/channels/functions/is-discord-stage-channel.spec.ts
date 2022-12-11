import { isDiscordStageChannel } from './is-discord-stage-channel';
import {
  AnyThreadChannel,
  CategoryChannel,
  ChannelType,
  DMChannel,
  GuildBasedChannel,
  NewsChannel,
  PrivateThreadChannel,
  PublicThreadChannel,
  StageChannel,
  TextBasedChannel,
  TextChannel,
  VoiceChannel,
} from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

describe(`isDiscordStageChannel()`, (): void => {
  let channel: GuildBasedChannel | TextBasedChannel | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      channel = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      channel = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "CategoryChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "DMChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<DMChannel>({ type: ChannelType.DM });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "NewsChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "StageChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is a "TextChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<TextChannel>({ type: ChannelType.GuildText });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "PublicThread"`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<PublicThreadChannel>({
        type: ChannelType.PublicThread,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "PrivateThread"`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<PrivateThreadChannel>({
        type: ChannelType.PrivateThread,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "AnnouncementThread"`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<PublicThreadChannel>({
        type: ChannelType.AnnouncementThread,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "GuildNewsThread"`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<AnyThreadChannel>({
        type: ChannelType.GuildNewsThread,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "GuildPublicThread"`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<AnyThreadChannel>({
        type: ChannelType.GuildPublicThread,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "GuildPrivateThread"`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<AnyThreadChannel>({
        type: ChannelType.GuildPrivateThread,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a "VoiceChannel" instance`, (): void => {
    beforeEach((): void => {
      channel = createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordStageChannel(channel);

      expect(result).toBe(false);
    });
  });
});
