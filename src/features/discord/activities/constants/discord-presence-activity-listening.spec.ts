import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";
import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_LISTENING } from "./discord-presence-activity-listening";

describe(`DISCORD_PRESENCE_ACTIVITY_LISTENING`, (): void => {
  it(`should contains a list of listening activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_LISTENING).toStrictEqual([
      {
        name: DiscordActivityNameEnum.SPOTIFY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MOM,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MOMMY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DAD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DADDY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DEEZER,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.APPLE_MUSIC,
        type: DiscordActivityTypeEnum.LISTENING,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
