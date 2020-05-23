import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_LISTENING } from "./discord-presence-activity-listening";

describe(`DISCORD_PRESENCE_ACTIVITY_LISTENING`, (): void => {
  it(`should contains a list of listening activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_LISTENING).toStrictEqual([
      {
        name: `Spotify`,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: `mom`,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: `dad`,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: `Deezer`,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: `Apple Music`,
        type: DiscordActivityTypeEnum.LISTENING,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
