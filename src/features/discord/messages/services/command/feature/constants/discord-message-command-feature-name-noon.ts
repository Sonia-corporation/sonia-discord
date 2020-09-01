import { DiscordCommandFirstArgument } from "../../../../classes/commands/arguments/discord-command-first-argument";
import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";

export const DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum> = new DiscordCommandFirstArgument(
  {
    description: `Configure the noon message sent at 12 A.M.`,
    name: DiscordMessageCommandFeatureNameEnum.NOON,
    shortcuts: [DiscordMessageCommandFeatureNameEnum.N],
  }
);
