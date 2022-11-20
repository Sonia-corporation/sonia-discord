import { getDiscordHumanizedChannelFromClass } from './get-discord-humanized-channel-from-class';
import {
  CategoryChannel,
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
    channel                                      | channelName          | output
    ${createInstance(TextChannel.prototype)}     | ${`TextChannel`}     | ${`text channel`}
    ${createInstance(DMChannel.prototype)}       | ${`DMChannel`}       | ${`private message`}
    ${createInstance(NewsChannel.prototype)}     | ${`NewsChannel`}     | ${`news channel`}
    ${createInstance(ThreadChannel.prototype)}   | ${`ThreadChannel`}   | ${`thread`}
    ${createInstance(CategoryChannel.prototype)} | ${`CategoryChannel`} | ${`category channel`}
    ${createInstance(StageChannel.prototype)}    | ${`StageChannel`}    | ${`stage channel`}
    ${createInstance(VoiceChannel.prototype)}    | ${`VoiceChannel`}    | ${`voice channel`}
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
