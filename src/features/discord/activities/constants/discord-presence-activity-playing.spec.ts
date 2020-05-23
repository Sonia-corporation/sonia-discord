import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_PLAYING } from "./discord-presence-activity-playing";

describe(`DISCORD_PRESENCE_ACTIVITY_PLAYING`, (): void => {
  it(`should contains a list of playing activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_PLAYING).toStrictEqual([
      {
        name: `God`,
        type: DiscordActivityTypeEnum.PLAYING,
      },
      {
        name: `WebStorm`,
        type: DiscordActivityTypeEnum.PLAYING,
      },
      {
        name: `Grand Theft Auto V`,
        type: DiscordActivityTypeEnum.PLAYING,
      },
      {
        name: `Counter-Strike: Global Offensive`,
        type: DiscordActivityTypeEnum.PLAYING,
      },
      {
        name: `Minecraft`,
        type: DiscordActivityTypeEnum.PLAYING,
      },
      {
        name: `World of Warcraft`,
        type: DiscordActivityTypeEnum.PLAYING,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
