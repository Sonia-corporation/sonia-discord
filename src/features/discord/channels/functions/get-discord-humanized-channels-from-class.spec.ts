import { getDiscordHumanizedChannelsFromClass } from './get-discord-humanized-channels-from-class';
import { DMChannel, NewsChannel, TextBasedChannel, TextChannel, ThreadChannel } from 'discord.js';

describe(`getDiscordHumanizedChannelsFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                       | channelNames                                     | output
    ${[createInstance(TextChannel.prototype)]}                                                                                     | ${`TextChannel`}                                 | ${`text channel`}
    ${[createInstance(DMChannel.prototype)]}                                                                                       | ${`DMChannel`}                                   | ${`private message`}
    ${[createInstance(NewsChannel.prototype)]}                                                                                     | ${`NewsChannel`}                                 | ${`news channel`}
    ${[createInstance(ThreadChannel.prototype)]}                                                                                   | ${`ThreadChannel`}                               | ${`thread`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}                                              | ${`TextChannel, TextChannel`}                    | ${`text channel and text channel`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}                                                  | ${`DMChannel, DMChannel`}                        | ${`private message and private message`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}                                              | ${`NewsChannel, NewsChannel`}                    | ${`news channel and news channel`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                          | ${`ThreadChannel, ThreadChannel`}                | ${`thread and thread`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}       | ${`TextChannel, TextChannel, TextChannel`}       | ${`text channel, text channel, and text channel`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}             | ${`DMChannel, DMChannel, DMChannel`}             | ${`private message, private message, and private message`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}       | ${`NewsChannel, NewsChannel, NewsChannel`}       | ${`news channel, news channel, and news channel`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]} | ${`ThreadChannel, ThreadChannel, ThreadChannel`} | ${`thread, thread, and thread`}
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
