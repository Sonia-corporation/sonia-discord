import { getDiscordHumanizedChannelPluralFromClass } from './get-discord-humanized-channel-plural-from-class';
import { DMChannel, NewsChannel, TextBasedChannel, TextChannel, ThreadChannel } from 'discord.js';

describe(`getDiscordHumanizedChannelPluralFromClass()`, (): void => {
  describe.each`
    channel                                    | channelName        | output
    ${undefined}                               | ${`TextChannel`}   | ${`channels`}
    ${createInstance(TextChannel.prototype)}   | ${`TextChannel`}   | ${`text channels`}
    ${createInstance(DMChannel.prototype)}     | ${`DMChannel`}     | ${`private messages`}
    ${createInstance(NewsChannel.prototype)}   | ${`NewsChannel`}   | ${`news channels`}
    ${createInstance(ThreadChannel.prototype)} | ${`ThreadChannel`} | ${`threads`}
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
