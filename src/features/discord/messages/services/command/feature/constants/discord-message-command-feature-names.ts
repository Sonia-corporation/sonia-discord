import { DiscordCommandFirstArguments } from "../../../../classes/commands/arguments/discord-command-first-arguments";
import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from "./discord-message-command-feature-name-noon";

export const DISCORD_MESSAGE_COMMAND_FEATURE_NAMES: DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum> = new DiscordCommandFirstArguments(
  [DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON]
);
