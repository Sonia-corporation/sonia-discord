import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_WATCHING } from "./discord-presence-activity-watching";

describe(`DISCORD_PRESENCE_ACTIVITY_WATCHING`, (): void => {
  it(`should contains a list of watching activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_WATCHING).toStrictEqual([
      {
        name: `YouTube`,
        type: `WATCHING`,
      },
      {
        name: `Amazon Prime Video`,
        type: `WATCHING`,
      },
      {
        name: `OCS`,
        type: `WATCHING`,
      },
      {
        name: `CANAL+ Series`,
        type: `WATCHING`,
      },
      {
        name: `Apple TV+`,
        type: `WATCHING`,
      },
      {
        name: `Disney+`,
        type: `WATCHING`,
      },
      {
        name: `YouTube Premium`,
        type: `WATCHING`,
      },
      {
        name: `Facebook Watch`,
        type: `WATCHING`,
      },
      {
        name: `Salto`,
        type: `WATCHING`,
      },
      {
        name: `Peacock`,
        type: `WATCHING`,
      },
      {
        name: `HBO Max`,
        type: `WATCHING`,
      },
      {
        name: `Twitch`,
        type: `WATCHING`,
      },
      {
        name: `you`,
        type: `WATCHING`,
      },
      {
        name: `like Big Brother`,
        type: `WATCHING`,
      },
      {
        name: `some memes`,
        type: `WATCHING`,
      },
      {
        name: `the FBI`,
        type: `WATCHING`,
      },
      {
        name: `the !help command`,
        type: `WATCHING`,
      },
      {
        name: `the $help command`,
        type: `WATCHING`,
      },
      {
        name: `the -help command`,
        type: `WATCHING`,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
