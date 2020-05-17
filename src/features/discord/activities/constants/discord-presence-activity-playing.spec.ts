import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_PLAYING } from "./discord-presence-activity-playing";

describe(`DISCORD_PRESENCE_ACTIVITY_PLAYING`, (): void => {
  it(`should contains a list of playing activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_PLAYING).toStrictEqual([
      {
        name: `God`,
        type: `PLAYING`,
      },
      {
        name: `WebStorm`,
        type: `PLAYING`,
      },
      {
        name: `Grand Theft Auto V`,
        type: `PLAYING`,
      },
      {
        name: `Counter-Strike: Global Offensive`,
        type: `PLAYING`,
      },
      {
        name: `Minecraft`,
        type: `PLAYING`,
      },
      {
        name: `World of Warcraft`,
        type: `PLAYING`,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
