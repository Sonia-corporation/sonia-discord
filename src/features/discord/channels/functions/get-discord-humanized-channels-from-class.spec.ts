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

describe(`getDiscordHumanizedChannelsFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                                                                                                                                            | channelNames                                           | output
    ${[createInstance(TextChannel.prototype, { type: ChannelType.GuildText })]}                                                                                                                                                                         | ${`TextChannel`}                                       | ${`text channel`}
    ${[createInstance(DMChannel.prototype, { type: ChannelType.DM })]}                                                                                                                                                                                  | ${`DMChannel`}                                         | ${`private message`}
    ${[createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })]}                                                                                                                                                                         | ${`NewsChannel`}                                       | ${`news channel`}
    ${[createInstance(ThreadChannel.prototype)]}                                                                                                                                                                                                        | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })]}                                                                                                                                                                 | ${`CategoryChannel`}                                   | ${`category channel`}
    ${[createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })]}                                                                                                                                                                  | ${`StageChannel`}                                      | ${`stage channel`}
    ${[createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })]}                                                                                                                                                                       | ${`VoiceChannel`}                                      | ${`voice channel`}
    ${[createInstance(TextChannel.prototype, { type: ChannelType.GuildText }), createInstance(TextChannel.prototype, { type: ChannelType.GuildText })]}                                                                                                 | ${`TextChannel, TextChannel`}                          | ${`text channel and text channel`}
    ${[createInstance(DMChannel.prototype, { type: ChannelType.DM }), createInstance(DMChannel.prototype, { type: ChannelType.DM })]}                                                                                                                   | ${`DMChannel, DMChannel`}                              | ${`private message and private message`}
    ${[createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews }), createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })]}                                                                                                 | ${`NewsChannel, NewsChannel`}                          | ${`news channel and news channel`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                                                                                                                                               | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory }), createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })]}                                                                                 | ${`CategoryChannel, CategoryChannel`}                  | ${`category channel and category channel`}
    ${[createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice }), createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })]}                                                                                   | ${`StageChannel, StageChannel`}                        | ${`stage channel and stage channel`}
    ${[createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice }), createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })]}                                                                                             | ${`VoiceChannel, VoiceChannel`}                        | ${`voice channel and voice channel`}
    ${[createInstance(TextChannel.prototype, { type: ChannelType.GuildText }), createInstance(TextChannel.prototype, { type: ChannelType.GuildText }), createInstance(TextChannel.prototype, { type: ChannelType.GuildText })]}                         | ${`TextChannel, TextChannel, TextChannel`}             | ${`text channel, text channel, and text channel`}
    ${[createInstance(DMChannel.prototype, { type: ChannelType.DM }), createInstance(DMChannel.prototype, { type: ChannelType.DM }), createInstance(DMChannel.prototype, { type: ChannelType.DM })]}                                                    | ${`DMChannel, DMChannel, DMChannel`}                   | ${`private message, private message, and private message`}
    ${[createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews }), createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews }), createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })]}                         | ${`NewsChannel, NewsChannel, NewsChannel`}             | ${`news channel, news channel, and news channel`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                                                                                                      | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory }), createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory }), createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })]} | ${`CategoryChannel, CategoryChannel, CategoryChannel`} | ${`category channel, category channel, and category channel`}
    ${[createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice }), createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice }), createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })]}    | ${`StageChannel, StageChannel, StageChannel`}          | ${`stage channel, stage channel, and stage channel`}
    ${[createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice }), createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice }), createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })]}                   | ${`VoiceChannel, VoiceChannel, VoiceChannel`}          | ${`voice channel, voice channel, and voice channel`}
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
