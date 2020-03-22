import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from './discord-sonia-corporation-message-embed-author-config';

export interface IDiscordSoniaConfig {
  secretToken: string;
  id: string;
  corporationMessageEmbedAuthor: IDiscordSoniaCorporationMessageEmbedAuthorConfig;
}
