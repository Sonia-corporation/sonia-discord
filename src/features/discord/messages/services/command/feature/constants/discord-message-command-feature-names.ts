import { DiscordCommandFirstArgument } from "../../../../classes/commands/arguments/discord-command-first-argument";
import { DiscordCommandFirstArguments } from "../../../../classes/commands/arguments/discord-command-first-arguments";
import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";

export const DISCORD_MESSAGE_COMMAND_FEATURE_NAMES: DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum> = new DiscordCommandFirstArguments(
  [
    new DiscordCommandFirstArgument({
      description: `Configure the noon message sent at 12AM.`,
      name: DiscordMessageCommandFeatureNameEnum.NOON,
      shortcuts: [DiscordMessageCommandFeatureNameEnum.N],
    }),
  ]
);
