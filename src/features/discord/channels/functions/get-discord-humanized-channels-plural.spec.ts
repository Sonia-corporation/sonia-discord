import { getDiscordHumanizedChannelsPlural } from './get-discord-humanized-channels-plural';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

describe(`getDiscordHumanizedChannelsPlural()`, (): void => {
  describe.each`
    channels                                                                                   | output
    ${[DiscordChannelEnum.TEXT]}                                                               | ${`text channels`}
    ${[DiscordChannelEnum.DM]}                                                                 | ${`private messages`}
    ${[DiscordChannelEnum.NEWS]}                                                               | ${`news channels`}
    ${[DiscordChannelEnum.THREAD]}                                                             | ${`threads`}
    ${[DiscordChannelEnum.CATEGORY]}                                                           | ${`category channels`}
    ${[DiscordChannelEnum.STAGE]}                                                              | ${`stage channels`}
    ${[DiscordChannelEnum.VOICE]}                                                              | ${`voice channels`}
    ${[DiscordChannelEnum.TEXT, DiscordChannelEnum.TEXT]}                                      | ${`text channels and text channels`}
    ${[DiscordChannelEnum.DM, DiscordChannelEnum.DM]}                                          | ${`private messages and private messages`}
    ${[DiscordChannelEnum.NEWS, DiscordChannelEnum.NEWS]}                                      | ${`news channels and news channels`}
    ${[DiscordChannelEnum.THREAD, DiscordChannelEnum.THREAD]}                                  | ${`threads and threads`}
    ${[DiscordChannelEnum.CATEGORY, DiscordChannelEnum.CATEGORY]}                              | ${`category channels and category channels`}
    ${[DiscordChannelEnum.STAGE, DiscordChannelEnum.STAGE]}                                    | ${`stage channels and stage channels`}
    ${[DiscordChannelEnum.VOICE, DiscordChannelEnum.VOICE]}                                    | ${`voice channels and voice channels`}
    ${[DiscordChannelEnum.TEXT, DiscordChannelEnum.TEXT, DiscordChannelEnum.TEXT]}             | ${`text channels, text channels, and text channels`}
    ${[DiscordChannelEnum.DM, DiscordChannelEnum.DM, DiscordChannelEnum.DM]}                   | ${`private messages, private messages, and private messages`}
    ${[DiscordChannelEnum.NEWS, DiscordChannelEnum.NEWS, DiscordChannelEnum.NEWS]}             | ${`news channels, news channels, and news channels`}
    ${[DiscordChannelEnum.THREAD, DiscordChannelEnum.THREAD, DiscordChannelEnum.THREAD]}       | ${`threads, threads, and threads`}
    ${[DiscordChannelEnum.CATEGORY, DiscordChannelEnum.CATEGORY, DiscordChannelEnum.CATEGORY]} | ${`category channels, category channels, and category channels`}
    ${[DiscordChannelEnum.STAGE, DiscordChannelEnum.STAGE, DiscordChannelEnum.STAGE]}          | ${`stage channels, stage channels, and stage channels`}
    ${[DiscordChannelEnum.VOICE, DiscordChannelEnum.VOICE, DiscordChannelEnum.VOICE]}          | ${`voice channels, voice channels, and voice channels`}
  `(`when the channel is $channels`, ({ channels, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelsPlural(channels);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channels: DiscordChannelEnum[];
  readonly output: string;
}
