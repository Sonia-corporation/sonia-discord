import { IAnyDiscordMessage } from "../../any-discord-message";
import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";

export type IDiscordCommandFlagAction = (
  anyDiscordMessage: Readonly<IAnyDiscordMessage>,
  value?: Readonly<string | null | undefined>
) => Promise<IDiscordCommandFlagSuccess>;
