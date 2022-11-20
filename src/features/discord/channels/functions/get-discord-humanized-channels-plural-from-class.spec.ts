import { getDiscordHumanizedChannelsPluralFromClass } from './get-discord-humanized-channels-plural-from-class';
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

describe(`getDiscordHumanizedChannelsPluralFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                             | channelNames                                           | output
    ${[createInstance(TextChannel.prototype)]}                                                                                           | ${`TextChannel`}                                       | ${`text channels`}
    ${[createInstance(DMChannel.prototype)]}                                                                                             | ${`DMChannel`}                                         | ${`private messages`}
    ${[createInstance(NewsChannel.prototype)]}                                                                                           | ${`NewsChannel`}                                       | ${`news channels`}
    ${[createInstance(ThreadChannel.prototype)]}                                                                                         | ${`ThreadChannel`}                                     | ${`threads`}
    ${[createInstance(CategoryChannel.prototype)]}                                                                                       | ${`CategoryChannel`}                                   | ${`category channels`}
    ${[createInstance(StageChannel.prototype)]}                                                                                          | ${`StageChannel`}                                      | ${`stage channels`}
    ${[createInstance(VoiceChannel.prototype)]}                                                                                          | ${`VoiceChannel`}                                      | ${`voice channels`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}                                                    | ${`TextChannel, TextChannel`}                          | ${`text channels and text channels`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}                                                        | ${`DMChannel, DMChannel`}                              | ${`private messages and private messages`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}                                                    | ${`NewsChannel, NewsChannel`}                          | ${`news channels and news channels`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                                | ${`ThreadChannel, ThreadChannel`}                      | ${`threads and threads`}
    ${[createInstance(CategoryChannel.prototype), createInstance(CategoryChannel.prototype)]}                                            | ${`CategoryChannel, CategoryChannel`}                  | ${`category channels and category channels`}
    ${[createInstance(StageChannel.prototype), createInstance(StageChannel.prototype)]}                                                  | ${`StageChannel, StageChannel`}                        | ${`stage channels and stage channels`}
    ${[createInstance(VoiceChannel.prototype), createInstance(VoiceChannel.prototype)]}                                                  | ${`VoiceChannel, VoiceChannel`}                        | ${`voice channels and voice channels`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}             | ${`TextChannel, TextChannel, TextChannel`}             | ${`text channels, text channels, and text channels`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}                   | ${`DMChannel, DMChannel, DMChannel`}                   | ${`private messages, private messages, and private messages`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}             | ${`NewsChannel, NewsChannel, NewsChannel`}             | ${`news channels, news channels, and news channels`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}       | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`threads, threads, and threads`}
    ${[createInstance(CategoryChannel.prototype), createInstance(CategoryChannel.prototype), createInstance(CategoryChannel.prototype)]} | ${`CategoryChannel, CategoryChannel, CategoryChannel`} | ${`category channels, category channels, and category channels`}
    ${[createInstance(StageChannel.prototype), createInstance(StageChannel.prototype), createInstance(StageChannel.prototype)]}          | ${`StageChannel, StageChannel, StageChannel`}          | ${`stage channels, stage channels, and stage channels`}
    ${[createInstance(VoiceChannel.prototype), createInstance(VoiceChannel.prototype), createInstance(VoiceChannel.prototype)]}          | ${`VoiceChannel, VoiceChannel, VoiceChannel`}          | ${`voice channels, voice channels, and voice channels`}
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
