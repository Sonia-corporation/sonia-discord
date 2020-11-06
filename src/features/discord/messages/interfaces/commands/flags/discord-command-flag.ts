import { IDiscordCommandFlagAction } from "../../../types/commands/flags/discord-command-flag-action";

export interface IDiscordCommandFlag<
  T extends string,
  TAction extends IDiscordCommandFlagAction<T>
> {
  action: TAction;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
