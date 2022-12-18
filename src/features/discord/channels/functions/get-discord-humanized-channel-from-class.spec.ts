import { getDiscordHumanizedChannelFromClass } from './get-discord-humanized-channel-from-class';
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

describe(`getDiscordHumanizedChannelFromClass()`, (): void => {
  describe.each`
    channel                                                                        | channelName          | output
    ${createHydratedMock<TextChannel>({ type: ChannelType.GuildText })}            | ${`TextChannel`}     | ${`text channel`}
    ${createHydratedMock<DMChannel>({ type: ChannelType.DM })}                     | ${`DMChannel`}       | ${`private message`}
    ${createHydratedMock<NewsChannel>({ type: ChannelType.GuildNews })}            | ${`NewsChannel`}     | ${`news channel`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })}       | ${`ThreadChannel`}   | ${`thread`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })}      | ${`ThreadChannel`}   | ${`thread`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.AnnouncementThread })} | ${`ThreadChannel`}   | ${`thread`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.GuildNewsThread })}    | ${`ThreadChannel`}   | ${`thread`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PublicThread })}       | ${`ThreadChannel`}   | ${`thread`}
    ${createHydratedMock<ThreadChannel>({ type: ChannelType.PrivateThread })}      | ${`ThreadChannel`}   | ${`thread`}
    ${createHydratedMock<CategoryChannel>({ type: ChannelType.GuildCategory })}    | ${`CategoryChannel`} | ${`category channel`}
    ${createHydratedMock<StageChannel>({ type: ChannelType.GuildStageVoice })}     | ${`StageChannel`}    | ${`stage channel`}
    ${createHydratedMock<VoiceChannel>({ type: ChannelType.GuildVoice })}          | ${`VoiceChannel`}    | ${`voice channel`}
  `(`when the channel is $channelName`, ({ channel, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedChannelFromClass(channel);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly channel: TextBasedChannel;
  readonly channelName: string;
  readonly output: string;
}
