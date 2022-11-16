import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from './discord-message-command-feature-name-noon';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES } from './discord-message-command-feature-name-release-notes';
import { DiscordCommandFirstArguments } from '../../../../classes/commands/arguments/discord-command-first-arguments';
import { DiscordMessageCommandFeatureNameEnum } from '../enums/discord-message-command-feature-name.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_NAMES: DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum> =
  new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>([
    DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
    DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES,
  ]);
