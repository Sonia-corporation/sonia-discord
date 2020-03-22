import { IDiscordGuildConfig } from './discord-guild-config';
import { IDiscordMessageConfig } from './discord-message-config';
import { IDiscordSoniaConfig } from './discord-sonia-config';

export interface IDiscordConfig {
  sonia: IDiscordSoniaConfig;
  message: IDiscordMessageConfig;
  guild: IDiscordGuildConfig;
}
