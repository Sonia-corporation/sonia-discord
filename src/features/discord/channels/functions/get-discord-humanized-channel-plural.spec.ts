import { getDiscordHumanizedChannelPlural } from './get-discord-humanized-channel-plural';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

describe(`getDiscordHumanizedChannelPlural()`, (): void => {
  describe.each`
    channel                        | output
    ${undefined}                   | ${`channels`}
    ${DiscordChannelEnum.TEXT}     | ${`text channels`}
    ${DiscordChannelEnum.DM}       | ${`private messages`}
    ${DiscordChannelEnum.NEWS}     | ${`news channels`}
    ${DiscordChannelEnum.THREAD}   | ${`threads`}
    ${DiscordChannelEnum.CATEGORY} | ${`category channels`}
    ${DiscordChannelEnum.STAGE}    | ${`stage channels`}
    ${DiscordChannelEnum.VOICE}    | ${`voice channels`}
  `(`when the channel is $channel`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelPlural(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: DiscordChannelEnum | undefined;
  readonly output: string;
}
