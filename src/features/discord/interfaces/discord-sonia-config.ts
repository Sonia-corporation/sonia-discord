import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from './discord-sonia-corporation-message-embed-author-config';
import { IconEnum } from '../../../enums/icon.enum';

export interface IDiscordSoniaConfig {
  corporationImageUrl: IconEnum;
  corporationMessageEmbedAuthor: IDiscordSoniaCorporationMessageEmbedAuthorConfig;
  id: string;
  secretToken: string;
}
