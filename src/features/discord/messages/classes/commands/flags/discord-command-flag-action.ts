import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";

export abstract class DiscordCommandFlagAction {
  public abstract execute: (
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value?: Readonly<string | null | undefined>
  ) => Promise<IDiscordCommandFlagSuccess>;
}
