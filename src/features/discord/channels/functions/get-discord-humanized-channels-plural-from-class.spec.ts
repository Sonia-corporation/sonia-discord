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

describe(`getDiscordHumanizedChannelsPluralFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                                                                                                                                            | channelNames                                           | output
    ${[createInstance(TextChannel.prototype, { type: ChannelType.GuildText })]}                                                                                                                                                                         | ${`TextChannel`}                                       | ${`text channels`}
    ${[createInstance(DMChannel.prototype, { type: ChannelType.DM })]}                                                                                                                                                                                  | ${`DMChannel`}                                         | ${`private messages`}
    ${[createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })]}                                                                                                                                                                         | ${`NewsChannel`}                                       | ${`news channels`}
    ${[createInstance(ThreadChannel.prototype)]}                                                                                                                                                                                                        | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })]}                                                                                                                                                                 | ${`CategoryChannel`}                                   | ${`category channels`}
    ${[createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })]}                                                                                                                                                                  | ${`StageChannel`}                                      | ${`stage channels`}
    ${[createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })]}                                                                                                                                                                       | ${`VoiceChannel`}                                      | ${`voice channels`}
    ${[createInstance(TextChannel.prototype, { type: ChannelType.GuildText }), createInstance(TextChannel.prototype, { type: ChannelType.GuildText })]}                                                                                                 | ${`TextChannel, TextChannel`}                          | ${`text channels and text channels`}
    ${[createInstance(DMChannel.prototype, { type: ChannelType.DM }), createInstance(DMChannel.prototype, { type: ChannelType.DM })]}                                                                                                                   | ${`DMChannel, DMChannel`}                              | ${`private messages and private messages`}
    ${[createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews }), createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })]}                                                                                                 | ${`NewsChannel, NewsChannel`}                          | ${`news channels and news channels`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                                                                                                                                               | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory }), createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })]}                                                                                 | ${`CategoryChannel, CategoryChannel`}                  | ${`category channels and category channels`}
    ${[createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice }), createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })]}                                                                                   | ${`StageChannel, StageChannel`}                        | ${`stage channels and stage channels`}
    ${[createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice }), createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })]}                                                                                             | ${`VoiceChannel, VoiceChannel`}                        | ${`voice channels and voice channels`}
    ${[createInstance(TextChannel.prototype, { type: ChannelType.GuildText }), createInstance(TextChannel.prototype, { type: ChannelType.GuildText }), createInstance(TextChannel.prototype, { type: ChannelType.GuildText })]}                         | ${`TextChannel, TextChannel, TextChannel`}             | ${`text channels, text channels, and text channels`}
    ${[createInstance(DMChannel.prototype, { type: ChannelType.DM }), createInstance(DMChannel.prototype, { type: ChannelType.DM }), createInstance(DMChannel.prototype, { type: ChannelType.DM })]}                                                    | ${`DMChannel, DMChannel, DMChannel`}                   | ${`private messages, private messages, and private messages`}
    ${[createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews }), createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews }), createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })]}                         | ${`NewsChannel, NewsChannel, NewsChannel`}             | ${`news channels, news channels, and news channels`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                                                                                                      | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory }), createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory }), createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })]} | ${`CategoryChannel, CategoryChannel, CategoryChannel`} | ${`category channels, category channels, and category channels`}
    ${[createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice }), createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice }), createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })]}    | ${`StageChannel, StageChannel, StageChannel`}          | ${`stage channels, stage channels, and stage channels`}
    ${[createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice }), createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice }), createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })]}                   | ${`VoiceChannel, VoiceChannel, VoiceChannel`}          | ${`voice channels, voice channels, and voice channels`}
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
