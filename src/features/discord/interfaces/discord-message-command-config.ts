import { IDiscordMessageCommandVersionConfig } from "./discord-message-command-version-config";

export interface IDiscordMessageCommandConfig {
  prefix: string | string[];
  version: IDiscordMessageCommandVersionConfig;
}
