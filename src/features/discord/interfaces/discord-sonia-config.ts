import { IconEnum } from "../../../enums/icon.enum";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "./discord-sonia-corporation-message-embed-author-config";

export interface IDiscordSoniaConfig {
  corporationImageUrl: IconEnum;
  corporationMessageEmbedAuthor: IDiscordSoniaCorporationMessageEmbedAuthorConfig;
  id: string;
  secretToken: string;
}
