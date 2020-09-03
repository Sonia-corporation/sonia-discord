import { IAnyDiscordMessage } from "../../../types/any-discord-message";

export interface IDiscordCommandFlag<T = string> {
  action: (
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value?: Readonly<string | null | undefined>
  ) => Promise<unknown>;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
