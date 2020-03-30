import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "./discord-sonia-corporation-message-embed-author-config";

export interface IDiscordSoniaConfig {
  corporationImageUrl: string;
  corporationMessageEmbedAuthor: IDiscordSoniaCorporationMessageEmbedAuthorConfig;
  id: string;
  secretToken: string;
}
