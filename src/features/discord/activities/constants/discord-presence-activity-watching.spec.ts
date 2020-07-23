import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";
import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_WATCHING } from "./discord-presence-activity-watching";

describe(`DISCORD_PRESENCE_ACTIVITY_WATCHING`, (): void => {
  it(`should contains a list of watching activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_WATCHING).toStrictEqual([
      {
        name: DiscordActivityNameEnum.YOU_TUBE,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.AMAZON_PRIME_VIDEO,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.OCS,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.CANAL_PLUS_SERIES,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.APPLE_TV_PLUS,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.DISNEY_PLUS,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.YOU_TUBE_PREMIUM,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.FACEBOOK_WATCH,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.SALTO,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.PEACOCK,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.HBO_MAX,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.TWITCH,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.YOU,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.LIKE_BIG_BROTHER,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.SOME_MEMES,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.THE_FBI,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.THE_EXCLAMATION_POINT_HELP_COMMAND,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.THE_DOLLAR_HELP_COMMAND,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.THE_DASH_HELP_COMMAND,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.SQUEEZIE_GAMING,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: DiscordActivityNameEnum.A_LIVE_OF_RAMMSTEIN,
        type: DiscordActivityTypeEnum.WATCHING,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
