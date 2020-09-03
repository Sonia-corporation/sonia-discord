import { IAnyDiscordMessage } from "../../../types/any-discord-message";

export interface IDiscordCommandFlag<T = string> {
  action: (anyDiscordMessage: Readonly<IAnyDiscordMessage>) => Promise<unknown>;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
