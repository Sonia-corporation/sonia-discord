import { DiscordCommandFlags } from './discord-command-flags';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { IDiscordCommandFlagResponse } from '../../../types/commands/flags/discord-command-flag-response';

export abstract class DiscordCommandFlagActionBoolean<T extends string> {
  public abstract execute: (
    anyDiscordMessage: IAnyDiscordMessage,
    value: string | null | undefined,
    discordCommandFlags: DiscordCommandFlags<T>
  ) => Promise<IDiscordCommandFlagResponse>;
}
