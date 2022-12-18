import { getDiscordHumanizedChannelPluralFromClass } from './get-discord-humanized-channel-plural-from-class';
import {
  CategoryChannel,
  ChannelType,
  DMChannel,
  NewsChannel,
  StageChannel,
  TextBasedChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

describe(`getDiscordHumanizedChannelPluralFromClass()`, (): void => {
  describe.each`
    channel                                                                        | channelName          | output
    ${undefined}                                                                   | ${`TextChannel`}     | ${`channels`}
    ${createHydratedMock<TextChannel>({ type: ChannelType.GuildText })}            | ${`TextChannel`}     | ${`text channels`}
    ${createHydratedMock<DMChannel>({ type: ChannelType.DM })}                     | ${`DMChannel`}       | ${`private messages`}
    ${createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })}            | ${`NewsChannel`}     | ${`news channels`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })}       | ${`ThreadChannel`}   | ${`threads`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })}      | ${`ThreadChannel`}   | ${`threads`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })} | ${`ThreadChannel`}   | ${`threads`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })}    | ${`ThreadChannel`}   | ${`threads`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })}       | ${`ThreadChannel`}   | ${`threads`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })}      | ${`ThreadChannel`}   | ${`threads`}
    ${createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })}    | ${`CategoryChannel`} | ${`category channels`}
    ${createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })}     | ${`StageChannel`}    | ${`stage channels`}
    ${createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })}          | ${`VoiceChannel`}    | ${`voice channels`}
  `(`when the channel is $channelName`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelPluralFromClass(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: TextBasedChannel;
  readonly channelName: string;
  readonly output: string;
}
