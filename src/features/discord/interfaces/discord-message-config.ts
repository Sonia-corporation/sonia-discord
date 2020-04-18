import { IDiscordMessageCommandConfig } from "./discord-message-command-config";
import { IDiscordMessageErrorConfig } from "./discord-message-error-config";
import { IDiscordMessageWarningConfig } from "./discord-message-warning-config";

export interface IDiscordMessageConfig {
  command: IDiscordMessageCommandConfig;
  error: IDiscordMessageErrorConfig;
  warning: IDiscordMessageWarningConfig;
}
