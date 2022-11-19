import { getDiscordHumanizedChannel } from './get-discord-humanized-channel';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

describe(`getDiscordHumanizedChannel()`, (): void => {
  describe.each`
    channel                      | output
    ${undefined}                 | ${`channel`}
    ${DiscordChannelEnum.TEXT}   | ${`text channel`}
    ${DiscordChannelEnum.DM}     | ${`private message`}
    ${DiscordChannelEnum.NEWS}   | ${`news channel`}
    ${DiscordChannelEnum.THREAD} | ${`thread`}
  `(`when the channel is $channel`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannel(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: DiscordChannelEnum | undefined;
  readonly output: string;
}
