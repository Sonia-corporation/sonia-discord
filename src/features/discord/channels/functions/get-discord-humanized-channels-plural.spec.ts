import { getDiscordHumanizedChannelsPlural } from './get-discord-humanized-channels-plural';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

describe(`getDiscordHumanizedChannelsPlural()`, (): void => {
  describe.each`
    channels                                                  | output
    ${[DiscordChannelEnum.TEXT]}                              | ${`text channels`}
    ${[DiscordChannelEnum.DM]}                                | ${`private messages`}
    ${[DiscordChannelEnum.NEWS]}                              | ${`news channels`}
    ${[DiscordChannelEnum.THREAD]}                            | ${`threads`}
    ${[DiscordChannelEnum.TEXT, DiscordChannelEnum.TEXT]}     | ${`text channels, text channels`}
    ${[DiscordChannelEnum.DM, DiscordChannelEnum.DM]}         | ${`private messages, private messages`}
    ${[DiscordChannelEnum.NEWS, DiscordChannelEnum.NEWS]}     | ${`news channels, news channels`}
    ${[DiscordChannelEnum.THREAD, DiscordChannelEnum.THREAD]} | ${`threads, threads`}
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
