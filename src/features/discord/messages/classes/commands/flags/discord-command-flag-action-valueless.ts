import { DiscordCommandFlags } from './discord-command-flags';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { IDiscordCommandFlagResponse } from '../../../types/commands/flags/discord-command-flag-response';

export abstract class DiscordCommandFlagActionValueless<T extends string> {
  public abstract execute: (
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value: string | null | undefined,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ) => Promise<IDiscordCommandFlagResponse>;
}
