import { DISCORD_PRESENCE_ACTIVITY_WATCHING } from './discord-presence-activity-watching';
import { DiscordActivityNameEnum } from '../enums/discord-activity-name.enum';
import { IDiscordPresenceActivity } from '../interfaces/discord-presence-activity';
import { ActivityType } from 'discord.js';

describe(`DISCORD_PRESENCE_ACTIVITY_WATCHING`, (): void => {
  it(`should contains a list of watching activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_WATCHING).toStrictEqual([
      {
        name: DiscordActivityNameEnum.YOU_TUBE,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.AMAZON_PRIME_VIDEO,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.OCS,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.CANAL_PLUS_SERIES,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.APPLE_TV_PLUS,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.DISNEY_PLUS,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.YOU_TUBE_PREMIUM,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.FACEBOOK_WATCH,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.SALTO,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.PEACOCK,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.HBO_MAX,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.TWITCH,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.YOU,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.LIKE_BIG_BROTHER,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.SOME_MEMES,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.THE_FBI,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.THE_EXCLAMATION_POINT_HELP_COMMAND,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.THE_DOLLAR_HELP_COMMAND,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.THE_DASH_HELP_COMMAND,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.SQUEEZIE_GAMING,
        type: ActivityType.Watching,
      },
      {
        name: DiscordActivityNameEnum.A_LIVE_OF_RAMMSTEIN,
        type: ActivityType.Watching,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
