import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_WATCHING } from "./discord-presence-activity-watching";

describe(`DISCORD_PRESENCE_ACTIVITY_WATCHING`, (): void => {
  it(`should contains a list of watching activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_WATCHING).toStrictEqual([
      {
        name: `YouTube`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Amazon Prime Video`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `OCS`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `CANAL+ Series`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Apple TV+`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Disney+`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `YouTube Premium`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Facebook Watch`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Salto`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Peacock`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `HBO Max`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `Twitch`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `you`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `like Big Brother`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `some memes`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `the FBI`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `the !help command`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `the $help command`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `the -help command`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `SQUEEZIE GAMING`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
      {
        name: `a live of Rammstein`,
        type: DiscordActivityTypeEnum.WATCHING,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
