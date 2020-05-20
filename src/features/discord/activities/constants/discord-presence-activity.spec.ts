import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY } from "./discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_LISTENING } from "./discord-presence-activity-listening";
import { DISCORD_PRESENCE_ACTIVITY_PLAYING } from "./discord-presence-activity-playing";
import { DISCORD_PRESENCE_ACTIVITY_WATCHING } from "./discord-presence-activity-watching";

describe(`DISCORD_PRESENCE_ACTIVITY`, (): void => {
  it(`should contains a list of all possible activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY).toStrictEqual([
      ...DISCORD_PRESENCE_ACTIVITY_LISTENING,
      ...DISCORD_PRESENCE_ACTIVITY_PLAYING,
      ...DISCORD_PRESENCE_ACTIVITY_WATCHING,
    ] as IDiscordPresenceActivity[]);
  });
});
