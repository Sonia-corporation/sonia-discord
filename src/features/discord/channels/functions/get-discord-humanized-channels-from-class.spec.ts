import { getDiscordHumanizedChannelsFromClass } from './get-discord-humanized-channels-from-class';
import {
  CategoryChannel,
  ChannelType,
  DMChannel,
  NewsChannel,
  StageChannel,
  TextBasedChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

describe(`getDiscordHumanizedChannelsFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                                                                                                                                   | channelNames                                           | output
    ${[createHydratedMock<TextChannel>({ type: ChannelType.GuildText })]}                                                                                                                                                                      | ${`TextChannel`}                                       | ${`text channel`}
    ${[createHydratedMock<DMChannel>({ type: ChannelType.DM })]}                                                                                                                                                                               | ${`DMChannel`}                                         | ${`private message`}
    ${[createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })]}                                                                                                                                                                      | ${`NewsChannel`}                                       | ${`news channel`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                                                                                                 | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                                                                                                | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })]}                                                                                                                                                           | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })]}                                                                                                                                                              | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                                                                                                 | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                                                                                                | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })]}                                                                                                                                                              | ${`CategoryChannel`}                                   | ${`category channel`}
    ${[createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })]}                                                                                                                                                               | ${`StageChannel`}                                      | ${`stage channel`}
    ${[createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })]}                                                                                                                                                                    | ${`VoiceChannel`}                                      | ${`voice channel`}
    ${[createHydratedMock<TextChannel>({ type: ChannelType.GuildText }), createHydratedMock<TextChannel>({ type: ChannelType.GuildText })]}                                                                                                    | ${`TextChannel, TextChannel`}                          | ${`text channel and text channel`}
    ${[createHydratedMock<DMChannel>({ type: ChannelType.DM }), createHydratedMock<DMChannel>({ type: ChannelType.DM })]}                                                                                                                      | ${`DMChannel, DMChannel`}                              | ${`private message and private message`}
    ${[createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews }), createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })]}                                                                                                    | ${`NewsChannel, NewsChannel`}                          | ${`news channel and news channel`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                          | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                        | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })]}                                                                              | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })]}                                                                                    | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                          | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                        | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory }), createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })]}                                                                                    | ${`CategoryChannel, CategoryChannel`}                  | ${`category channel and category channel`}
    ${[createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice }), createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })]}                                                                                      | ${`StageChannel, StageChannel`}                        | ${`stage channel and stage channel`}
    ${[createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice }), createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })]}                                                                                                | ${`VoiceChannel, VoiceChannel`}                        | ${`voice channel and voice channel`}
    ${[createHydratedMock<TextChannel>({ type: ChannelType.GuildText }), createHydratedMock<TextChannel>({ type: ChannelType.GuildText }), createHydratedMock<TextChannel>({ type: ChannelType.GuildText })]}                                  | ${`TextChannel, TextChannel, TextChannel`}             | ${`text channel, text channel, and text channel`}
    ${[createHydratedMock<DMChannel>({ type: ChannelType.DM }), createHydratedMock<DMChannel>({ type: ChannelType.DM }), createHydratedMock<DMChannel>({ type: ChannelType.DM })]}                                                             | ${`DMChannel, DMChannel, DMChannel`}                   | ${`private message, private message, and private message`}
    ${[createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews }), createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews }), createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })]}                                  | ${`NewsChannel, NewsChannel, NewsChannel`}             | ${`news channel, news channel, and news channel`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                   | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })]} | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })]}          | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                   | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory }), createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory }), createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })]}          | ${`CategoryChannel, CategoryChannel, CategoryChannel`} | ${`category channel, category channel, and category channel`}
    ${[createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice }), createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice }), createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })]}             | ${`StageChannel, StageChannel, StageChannel`}          | ${`stage channel, stage channel, and stage channel`}
    ${[createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice }), createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice }), createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })]}                            | ${`VoiceChannel, VoiceChannel, VoiceChannel`}          | ${`voice channel, voice channel, and voice channel`}
  `(`when the channel is $channelNames`, ({ channels, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelsFromClass(channels);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channelNames: string;
  readonly channels: TextBasedChannel[];
  readonly output: string;
}
