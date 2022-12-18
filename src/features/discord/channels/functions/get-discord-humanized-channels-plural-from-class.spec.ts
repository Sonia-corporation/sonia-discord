import { getDiscordHumanizedChannelsPluralFromClass } from './get-discord-humanized-channels-plural-from-class';
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

describe(`getDiscordHumanizedChannelsPluralFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                                                                                                                                   | channelNames                                           | output
    ${[createHydratedMock<TextChannel>({ type: ChannelType.GuildText })]}                                                                                                                                                                      | ${`TextChannel`}                                       | ${`text channels`}
    ${[createHydratedMock<DMChannel>({ type: ChannelType.DM })]}                                                                                                                                                                               | ${`DMChannel`}                                         | ${`private messages`}
    ${[createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })]}                                                                                                                                                                      | ${`NewsChannel`}                                       | ${`news channels`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                                                                                                 | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                                                                                                | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })]}                                                                                                                                                           | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })]}                                                                                                                                                              | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                                                                                                 | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                                                                                                | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })]}                                                                                                                                                              | ${`CategoryChannel`}                                   | ${`category channels`}
    ${[createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })]}                                                                                                                                                               | ${`StageChannel`}                                      | ${`stage channels`}
    ${[createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })]}                                                                                                                                                                    | ${`VoiceChannel`}                                      | ${`voice channels`}
    ${[createHydratedMock<TextChannel>({ type: ChannelType.GuildText }), createHydratedMock<TextChannel>({ type: ChannelType.GuildText })]}                                                                                                    | ${`TextChannel, TextChannel`}                          | ${`text channels and text channels`}
    ${[createHydratedMock<DMChannel>({ type: ChannelType.DM }), createHydratedMock<DMChannel>({ type: ChannelType.DM })]}                                                                                                                      | ${`DMChannel, DMChannel`}                              | ${`private messages and private messages`}
    ${[createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews }), createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })]}                                                                                                    | ${`NewsChannel, NewsChannel`}                          | ${`news channels and news channels`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                          | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                        | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })]}                                                                              | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })]}                                                                                    | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                                                                                          | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                                                                                        | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory }), createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })]}                                                                                    | ${`CategoryChannel, CategoryChannel`}                  | ${`category channels and category channels`}
    ${[createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice }), createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })]}                                                                                      | ${`StageChannel, StageChannel`}                        | ${`stage channels and stage channels`}
    ${[createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice }), createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })]}                                                                                                | ${`VoiceChannel, VoiceChannel`}                        | ${`voice channels and voice channels`}
    ${[createHydratedMock<TextChannel>({ type: ChannelType.GuildText }), createHydratedMock<TextChannel>({ type: ChannelType.GuildText }), createHydratedMock<TextChannel>({ type: ChannelType.GuildText })]}                                  | ${`TextChannel, TextChannel, TextChannel`}             | ${`text channels, text channels, and text channels`}
    ${[createHydratedMock<DMChannel>({ type: ChannelType.DM }), createHydratedMock<DMChannel>({ type: ChannelType.DM }), createHydratedMock<DMChannel>({ type: ChannelType.DM })]}                                                             | ${`DMChannel, DMChannel, DMChannel`}                   | ${`private messages, private messages, and private messages`}
    ${[createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews }), createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews }), createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })]}                                  | ${`NewsChannel, NewsChannel, NewsChannel`}             | ${`news channels, news channels, and news channels`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                   | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })]} | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })]}          | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })]}                   | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread }), createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })]}                | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory }), createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory }), createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })]}          | ${`CategoryChannel, CategoryChannel, CategoryChannel`} | ${`category channels, category channels, and category channels`}
    ${[createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice }), createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice }), createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })]}             | ${`StageChannel, StageChannel, StageChannel`}          | ${`stage channels, stage channels, and stage channels`}
    ${[createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice }), createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice }), createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })]}                            | ${`VoiceChannel, VoiceChannel, VoiceChannel`}          | ${`voice channels, voice channels, and voice channels`}
  `(`when the channel is $channelNames`, ({ channels, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelsPluralFromClass(channels);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channelNames: string;
  readonly channels: TextBasedChannel[];
  readonly output: string;
}
