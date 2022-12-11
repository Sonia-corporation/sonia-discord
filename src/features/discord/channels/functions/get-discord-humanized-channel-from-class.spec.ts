import { getDiscordHumanizedChannelFromClass } from './get-discord-humanized-channel-from-class';
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

describe(`getDiscordHumanizedChannelFromClass()`, (): void => {
  describe.each`
    channel                                                                           | channelName          | output
    ${createInstance(TextChannel.prototype, { type: ChannelType.GuildText })}         | ${`TextChannel`}     | ${`text channel`}
    ${createInstance(DMChannel.prototype, { type: ChannelType.DM })}                  | ${`DMChannel`}       | ${`private message`}
    ${createInstance(NewsChannel.prototype, { type: ChannelType.GuildNews })}         | ${`NewsChannel`}     | ${`news channel`}
    ${createInstance(ThreadChannel.prototype)}                                        | ${`ThreadChannel`}   | ${`thread`}
    ${createInstance(CategoryChannel.prototype, { type: ChannelType.GuildCategory })} | ${`CategoryChannel`} | ${`category channel`}
    ${createInstance(StageChannel.prototype, { type: ChannelType.GuildStageVoice })}  | ${`StageChannel`}    | ${`stage channel`}
    ${createInstance(VoiceChannel.prototype, { type: ChannelType.GuildVoice })}       | ${`VoiceChannel`}    | ${`voice channel`}
  `(`when the channel is $channelName`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelFromClass(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: TextBasedChannel;
  readonly channelName: string;
  readonly output: string;
}
