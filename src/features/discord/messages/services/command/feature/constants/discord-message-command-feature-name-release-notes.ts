import { DiscordCommandFirstArgument } from '../../../../classes/commands/arguments/discord-command-first-argument';
import { DiscordMessageCommandFeatureNameEnum } from '../enums/discord-message-command-feature-name.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum> = new DiscordCommandFirstArgument(
  {
    description: `Configure the message sent when there is a new release note`,
    name: DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES,
    shortcuts: [DiscordMessageCommandFeatureNameEnum.R],
  }
);
