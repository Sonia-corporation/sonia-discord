import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagResponse } from "../../../types/commands/flags/discord-command-flag-response";

export abstract class DiscordCommandFlagAction {
  public abstract execute: (
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value?: Readonly<string | null | undefined>
  ) => Promise<IDiscordCommandFlagResponse>;
}
