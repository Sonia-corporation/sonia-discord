import { IDiscordCommandFlagAction } from "../../../types/commands/flags/discord-command-flag-action";

export interface IDiscordCommandFlag<T = string> {
  action: IDiscordCommandFlagAction;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
