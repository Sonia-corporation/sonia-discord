import { getDiscordHumanizedChannelsFromClass } from './get-discord-humanized-channels-from-class';
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

describe(`getDiscordHumanizedChannelsFromClass()`, (): void => {
  describe.each`
    channels                                                                                                                             | channelNames                                           | output
    ${[createInstance(TextChannel.prototype)]}                                                                                           | ${`TextChannel`}                                       | ${`text channel`}
    ${[createInstance(DMChannel.prototype)]}                                                                                             | ${`DMChannel`}                                         | ${`private message`}
    ${[createInstance(NewsChannel.prototype)]}                                                                                           | ${`NewsChannel`}                                       | ${`news channel`}
    ${[createInstance(ThreadChannel.prototype)]}                                                                                         | ${`ThreadChannel`}                                     | ${`thread`}
    ${[createInstance(CategoryChannel.prototype)]}                                                                                       | ${`CategoryChannel`}                                   | ${`category channel`}
    ${[createInstance(StageChannel.prototype)]}                                                                                          | ${`StageChannel`}                                      | ${`stage channel`}
    ${[createInstance(VoiceChannel.prototype)]}                                                                                          | ${`VoiceChannel`}                                      | ${`voice channel`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}                                                    | ${`TextChannel, TextChannel`}                          | ${`text channel and text channel`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}                                                        | ${`DMChannel, DMChannel`}                              | ${`private message and private message`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}                                                    | ${`NewsChannel, NewsChannel`}                          | ${`news channel and news channel`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}                                                | ${`ThreadChannel, ThreadChannel`}                      | ${`thread and thread`}
    ${[createInstance(CategoryChannel.prototype), createInstance(CategoryChannel.prototype)]}                                            | ${`CategoryChannel, CategoryChannel`}                  | ${`category channel and category channel`}
    ${[createInstance(StageChannel.prototype), createInstance(StageChannel.prototype)]}                                                  | ${`StageChannel, StageChannel`}                        | ${`stage channel and stage channel`}
    ${[createInstance(VoiceChannel.prototype), createInstance(VoiceChannel.prototype)]}                                                  | ${`VoiceChannel, VoiceChannel`}                        | ${`voice channel and voice channel`}
    ${[createInstance(TextChannel.prototype), createInstance(TextChannel.prototype), createInstance(TextChannel.prototype)]}             | ${`TextChannel, TextChannel, TextChannel`}             | ${`text channel, text channel, and text channel`}
    ${[createInstance(DMChannel.prototype), createInstance(DMChannel.prototype), createInstance(DMChannel.prototype)]}                   | ${`DMChannel, DMChannel, DMChannel`}                   | ${`private message, private message, and private message`}
    ${[createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype), createInstance(NewsChannel.prototype)]}             | ${`NewsChannel, NewsChannel, NewsChannel`}             | ${`news channel, news channel, and news channel`}
    ${[createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype), createInstance(ThreadChannel.prototype)]}       | ${`ThreadChannel, ThreadChannel, ThreadChannel`}       | ${`thread, thread, and thread`}
    ${[createInstance(CategoryChannel.prototype), createInstance(CategoryChannel.prototype), createInstance(CategoryChannel.prototype)]} | ${`CategoryChannel, CategoryChannel, CategoryChannel`} | ${`category channel, category channel, and category channel`}
    ${[createInstance(StageChannel.prototype), createInstance(StageChannel.prototype), createInstance(StageChannel.prototype)]}          | ${`StageChannel, StageChannel, StageChannel`}          | ${`stage channel, stage channel, and stage channel`}
    ${[createInstance(VoiceChannel.prototype), createInstance(VoiceChannel.prototype), createInstance(VoiceChannel.prototype)]}          | ${`VoiceChannel, VoiceChannel, VoiceChannel`}          | ${`voice channel, voice channel, and voice channel`}
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
