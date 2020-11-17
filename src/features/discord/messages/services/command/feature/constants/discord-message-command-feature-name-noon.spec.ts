import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from './discord-message-command-feature-name-noon';
import { DiscordCommandFirstArgument } from '../../../../classes/commands/arguments/discord-command-first-argument';
import { DiscordMessageCommandFeatureNameEnum } from '../enums/discord-message-command-feature-name.enum';

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON`, (): void => {
  it(`should be the Discord noon feature command message`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON).toStrictEqual(
      new DiscordCommandFirstArgument({
        description: `Configure the noon message sent at 12 A.M.`,
        name: DiscordMessageCommandFeatureNameEnum.NOON,
        shortcuts: [DiscordMessageCommandFeatureNameEnum.N],
      })
    );
  });
});
