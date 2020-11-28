import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from './discord-sonia-corporation-message-embed-author-config';
import { IconEnum } from '../../../enums/icon.enum';
import { Snowflake } from 'discord.js';

export interface IDiscordSoniaConfig {
  corporationImageUrl: IconEnum;
  corporationMessageEmbedAuthor: IDiscordSoniaCorporationMessageEmbedAuthorConfig;
  devGuildIdWhitelist: Snowflake[];
  id: string;
  secretToken: string;
}
