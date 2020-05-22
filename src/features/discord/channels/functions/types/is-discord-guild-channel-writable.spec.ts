import { createMock } from "ts-auto-mock";
import { isDiscordGuildChannelWritable } from "./is-discord-guild-channel-writable";
import {
  GuildChannel,
  TextChannel,
  CategoryChannel,
  VoiceChannel,
  NewsChannel,
  StoreChannel,
} from "discord.js";

describe(`isDiscordGuildChannelWritable()`, (): void => {
  let guildChannel: GuildChannel;

  describe(`when the given guild channel is a text channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createMock<TextChannel>();
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelWritableResult = isDiscordGuildChannelWritable(
        guildChannel
      );

      expect(isDiscordGuildChannelWritableResult).toStrictEqual(true);
    });
  });

  describe(`when the given guild channel is a voice channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createMock<VoiceChannel>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelWritableResult = isDiscordGuildChannelWritable(
        guildChannel
      );

      expect(isDiscordGuildChannelWritableResult).toStrictEqual(false);
    });
  });

  describe(`when the given guild channel is a category channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createMock<CategoryChannel>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelWritableResult = isDiscordGuildChannelWritable(
        guildChannel
      );

      expect(isDiscordGuildChannelWritableResult).toStrictEqual(false);
    });
  });

  describe(`when the given guild channel is a news channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createMock<NewsChannel>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelWritableResult = isDiscordGuildChannelWritable(
        guildChannel
      );

      expect(isDiscordGuildChannelWritableResult).toStrictEqual(false);
    });
  });

  describe(`when the given guild channel is a store channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createMock<StoreChannel>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isDiscordGuildChannelWritableResult = isDiscordGuildChannelWritable(
        guildChannel
      );

      expect(isDiscordGuildChannelWritableResult).toStrictEqual(false);
    });
  });
});
