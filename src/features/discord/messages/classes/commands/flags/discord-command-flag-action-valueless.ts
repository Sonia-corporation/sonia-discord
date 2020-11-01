import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagResponse } from "../../../types/commands/flags/discord-command-flag-response";

export abstract class DiscordCommandFlagActionValueless {
  public abstract execute: (
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ) => Promise<IDiscordCommandFlagResponse>;
}
