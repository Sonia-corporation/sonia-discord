import { IDiscordMessageCommandCookieConfig } from "./discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "./discord-message-command-error-config";
import { IDiscordMessageCommandHelpConfig } from "./discord-message-command-help-config";
import { IDiscordMessageCommandLunchConfig } from "./discord-message-command-lunch-config";
import { IDiscordMessageCommandReleaseNotesConfig } from "./discord-message-command-release-notes-config";
import { IDiscordMessageCommandVersionConfig } from "./discord-message-command-version-config";

export interface IDiscordMessageCommandConfig {
  cookie: IDiscordMessageCommandCookieConfig;
  error: IDiscordMessageCommandErrorConfig;
  help: IDiscordMessageCommandHelpConfig;
  lunch: IDiscordMessageCommandLunchConfig;
  prefix: string | string[];
  releaseNotes: IDiscordMessageCommandReleaseNotesConfig;
  version: IDiscordMessageCommandVersionConfig;
}
