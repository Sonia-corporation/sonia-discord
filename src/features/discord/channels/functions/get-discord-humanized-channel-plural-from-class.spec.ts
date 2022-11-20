import { getDiscordHumanizedChannelPluralFromClass } from './get-discord-humanized-channel-plural-from-class';
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

describe(`getDiscordHumanizedChannelPluralFromClass()`, (): void => {
  describe.each`
    channel                                      | channelName          | output
    ${undefined}                                 | ${`TextChannel`}     | ${`channels`}
    ${createInstance(TextChannel.prototype)}     | ${`TextChannel`}     | ${`text channels`}
    ${createInstance(DMChannel.prototype)}       | ${`DMChannel`}       | ${`private messages`}
    ${createInstance(NewsChannel.prototype)}     | ${`NewsChannel`}     | ${`news channels`}
    ${createInstance(ThreadChannel.prototype)}   | ${`ThreadChannel`}   | ${`threads`}
    ${createInstance(CategoryChannel.prototype)} | ${`CategoryChannel`} | ${`category channels`}
    ${createInstance(StageChannel.prototype)}    | ${`StageChannel`}    | ${`stage channels`}
    ${createInstance(VoiceChannel.prototype)}    | ${`VoiceChannel`}    | ${`voice channels`}
  `(`when the channel is $channelName`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelPluralFromClass(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: TextBasedChannel;
  readonly channelName: string;
  readonly output: string;
}
