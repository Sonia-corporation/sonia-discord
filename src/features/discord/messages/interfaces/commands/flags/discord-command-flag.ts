import { DiscordCommandFlagAction } from "../../../classes/commands/flags/discord-command-flag-action";

export interface IDiscordCommandFlag<T = string> {
  action: DiscordCommandFlagAction;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
