import { getDiscordHumanizedChannels } from './get-discord-humanized-channels';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

describe(`getDiscordHumanizedChannels()`, (): void => {
  describe.each`
    channels                                                  | output
    ${[DiscordChannelEnum.TEXT]}                              | ${`text channel`}
    ${[DiscordChannelEnum.DM]}                                | ${`private message`}
    ${[DiscordChannelEnum.NEWS]}                              | ${`news channel`}
    ${[DiscordChannelEnum.THREAD]}                            | ${`thread`}
    ${[DiscordChannelEnum.TEXT, DiscordChannelEnum.TEXT]}     | ${`text channel, text channel`}
    ${[DiscordChannelEnum.DM, DiscordChannelEnum.DM]}         | ${`private message, private message`}
    ${[DiscordChannelEnum.NEWS, DiscordChannelEnum.NEWS]}     | ${`news channel, news channel`}
    ${[DiscordChannelEnum.THREAD, DiscordChannelEnum.THREAD]} | ${`thread, thread`}
  `(`when the channel is $channels`, ({ channels, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannels(channels);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channels: DiscordChannelEnum[];
  readonly output: string;
}
