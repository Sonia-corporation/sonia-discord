import { DISCORD_PRESENCE_ACTIVITY_PLAYING } from './discord-presence-activity-playing';
import { DiscordActivityNameEnum } from '../enums/discord-activity-name.enum';
import { IDiscordPresenceActivity } from '../interfaces/discord-presence-activity';
import { ActivityType } from 'discord.js';

describe(`DISCORD_PRESENCE_ACTIVITY_PLAYING`, (): void => {
  it(`should contains a list of playing activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_PLAYING).toStrictEqual([
      {
        name: DiscordActivityNameEnum.GOD,
        type: ActivityType.Playing,
      },
      {
        name: DiscordActivityNameEnum.WEB_STORM,
        type: ActivityType.Playing,
      },
      {
        name: DiscordActivityNameEnum.GRAND_THEFT_AUTO_V,
        type: ActivityType.Playing,
      },
      {
        name: DiscordActivityNameEnum.COUNTER_STRIKE_GLOBAL_OFFENSIVE,
        type: ActivityType.Playing,
      },
      {
        name: DiscordActivityNameEnum.MINECRAFT,
        type: ActivityType.Playing,
      },
      {
        name: DiscordActivityNameEnum.WORLD_OF_WARCRAFT,
        type: ActivityType.Playing,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
