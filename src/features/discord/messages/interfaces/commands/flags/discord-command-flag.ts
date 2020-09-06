import { DiscordCommandFlagActionService } from "../../../classes/commands/flags/discord-command-flag-action-service";

export interface IDiscordCommandFlag<T = string> {
  action: DiscordCommandFlagActionService;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
