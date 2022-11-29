import { IDiscordMessageCommandCliErrorConfig } from './discord-message-command-cli-error-config';
import { IDiscordMessageCommandCookieConfig } from './discord-message-command-cookie-config';
import { IDiscordMessageCommandErrorConfig } from './discord-message-command-error-config';
import { IDiscordMessageCommandHeartbeatConfig } from './discord-message-command-heartbeat-config';
import { IDiscordMessageCommandHelpConfig } from './discord-message-command-help-config';
import { IDiscordMessageCommandLunchConfig } from './discord-message-command-lunch-config';
import { IDiscordMessageCommandReleaseNotesConfig } from './discord-message-command-release-notes-config';
import { IDiscordMessageCommandVersionConfig } from './discord-message-command-version-config';

/**
 * @description
 * The configuration associated to the command.
 * @see [sonia-link-003]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-003}.
 */
export interface IDiscordMessageCommandConfig {
  cliError: IDiscordMessageCommandCliErrorConfig;
  cookie: IDiscordMessageCommandCookieConfig;
  error: IDiscordMessageCommandErrorConfig;
  heartbeat: IDiscordMessageCommandHeartbeatConfig;
  help: IDiscordMessageCommandHelpConfig;
  lunch: IDiscordMessageCommandLunchConfig;
  prefix: string | string[];
  releaseNotes: IDiscordMessageCommandReleaseNotesConfig;
  version: IDiscordMessageCommandVersionConfig;
}
