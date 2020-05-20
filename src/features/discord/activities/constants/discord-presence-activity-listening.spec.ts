import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_LISTENING } from "./discord-presence-activity-listening";

describe(`DISCORD_PRESENCE_ACTIVITY_LISTENING`, (): void => {
  it(`should contains a list of listening activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_LISTENING).toStrictEqual([
      {
        name: `Spotify`,
        type: `LISTENING`,
      },
      {
        name: `mom`,
        type: `LISTENING`,
      },
      {
        name: `dad`,
        type: `LISTENING`,
      },
      {
        name: `Deezer`,
        type: `LISTENING`,
      },
      {
        name: `Apple Music`,
        type: `LISTENING`,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
