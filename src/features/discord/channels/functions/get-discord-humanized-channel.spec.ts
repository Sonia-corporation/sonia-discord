import { getDiscordHumanizedChannel } from './get-discord-humanized-channel';
import { DMChannel, NewsChannel, TextBasedChannel, TextChannel, ThreadChannel } from 'discord.js';

describe(`getDiscordHumanizedChannel()`, (): void => {
  describe.each`
    channel                                    | channelName        | output
    ${createInstance(TextChannel.prototype)}   | ${`TextChannel`}   | ${`text channel`}
    ${createInstance(DMChannel.prototype)}     | ${`DMChannel`}     | ${`private message`}
    ${createInstance(NewsChannel.prototype)}   | ${`NewsChannel`}   | ${`news channel`}
    ${createInstance(ThreadChannel.prototype)} | ${`ThreadChannel`} | ${`thread`}
  `(`when the channel is $channelName`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannel(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: TextBasedChannel;
  readonly channelName: string;
  readonly output: string;
}
