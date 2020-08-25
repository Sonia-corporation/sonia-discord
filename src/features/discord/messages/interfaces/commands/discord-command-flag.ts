import { DiscordCommandFlagTypeEnum } from "../../enums/commands/discord-command-flag-type.enum";

export interface IDiscordCommandFlag<T> {
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
  type: DiscordCommandFlagTypeEnum;
}
