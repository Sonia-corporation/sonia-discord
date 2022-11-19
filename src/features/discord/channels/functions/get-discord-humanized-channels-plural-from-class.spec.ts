import { getDiscordHumanizedChannelsPluralFromClass } from './get-discord-humanized-channels-plural-from-class';
import { DMChannel, NewsChannel, TextBasedChannel, TextChannel, ThreadChannel } from 'discord.js';

describe(`getDiscordHumanizedChannelsPluralFromClass()`, (): void => {
  describe.each`
    channels                                                                              | channelNames                      | output
    ${[createInstance(TextChannel.prototype)]}                                            | ${`TextChannel`}                  | ${`text channels`}
    ${[createInstance(DMChannel.prototype)]}                                              | ${`DMChannel`}                    | ${`private messages`}
    ${[createInstance(NewsChannel.prototype)]}                                            | ${`NewsChannel`}                  | ${`news channels`}
    ${[createInstance(ThreadChannel.prototype)]}                                          | ${`ThreadChannel`}                | ${`threads`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}     | ${`TextChannel, TextChannel`}     | ${`text channels, text channels`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}         | ${`DMChannel, DMChannel`}         | ${`private messages, private messages`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}     | ${`NewsChannel, NewsChannel`}     | ${`news channels, news channels`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]} | ${`ThreadChannel, ThreadChannel`} | ${`threads, threads`}
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
