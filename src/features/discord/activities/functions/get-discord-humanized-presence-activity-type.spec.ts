import { getDiscordHumanizedPresenceActivityType } from './get-discord-humanized-presence-activity-type';
import { IDiscordHumanizedPresenceActivityType } from '../interfaces/discord-humanized-presence-activity-type';
import { ActivityType } from 'discord.js';

describe(`getDiscordHumanizedPresenceActivityType()`, (): void => {
  describe.each`
    activityType              | output
    ${ActivityType.Playing}   | ${`playing`}
    ${ActivityType.Streaming} | ${`streaming`}
    ${ActivityType.Listening} | ${`listening`}
    ${ActivityType.Watching}  | ${`watching`}
    ${ActivityType.Custom}    | ${`custom`}
    ${ActivityType.Competing} | ${`competing`}
  `(`when the given activity type is $activityType`, ({ activityType, output }: IMatrix): void => {
    it(`should return ${output}`, (): void => {
      expect.assertions(1);

      const result = getDiscordHumanizedPresenceActivityType(activityType);

      expect(result).toStrictEqual(output);
    });
  });
});

interface IMatrix {
  readonly activityType: ActivityType;
  readonly output: IDiscordHumanizedPresenceActivityType;
}
