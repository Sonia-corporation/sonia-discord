import { isDiscordGuildChannelWritable } from './is-discord-guild-channel-writable';
import { CategoryChannel, GuildChannel, NewsChannel, StoreChannel, TextChannel, VoiceChannel } from 'discord.js';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

describe(`isDiscordGuildChannelWritable()`, (): void => {
  let guildChannel: GuildChannel;

  describe(`when the given guild channel is a text channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createHydratedMock<TextChannel>({
        isText(): boolean {
          return _.includes([`text`, `news`], guildChannel.type);
        },
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuildChannelWritable(guildChannel);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given guild channel is a voice channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createHydratedMock<VoiceChannel>({
        isText(): boolean {
          return _.includes([`text`, `news`], guildChannel.type);
        },
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuildChannelWritable(guildChannel);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given guild channel is a category channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createHydratedMock<CategoryChannel>({
        isText(): boolean {
          return _.includes([`text`, `news`], guildChannel.type);
        },
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuildChannelWritable(guildChannel);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given guild channel is a news channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createHydratedMock<NewsChannel>({
        isText(): boolean {
          return _.includes([`text`, `news`], guildChannel.type);
        },
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuildChannelWritable(guildChannel);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given guild channel is a store channel`, (): void => {
    beforeEach((): void => {
      guildChannel = createHydratedMock<StoreChannel>({
        isText(): boolean {
          return _.includes([`text`, `news`], guildChannel.type);
        },
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordGuildChannelWritable(guildChannel);

      expect(result).toStrictEqual(false);
    });
  });
});
