import _ from "lodash";
import { IDiscordSoniaConfig } from "../../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../../interfaces/discord-sonia-corporation-message-embed-author-config";

export class DiscordSoniaConfigCoreService implements IDiscordSoniaConfig {
  private static _instance: DiscordSoniaConfigCoreService;

  public static getInstance(): DiscordSoniaConfigCoreService {
    if (_.isNil(DiscordSoniaConfigCoreService._instance)) {
      DiscordSoniaConfigCoreService._instance = new DiscordSoniaConfigCoreService();
    }

    return DiscordSoniaConfigCoreService._instance;
  }

  public corporationImageUrl = `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`;
  public corporationMessageEmbedAuthor: IDiscordSoniaCorporationMessageEmbedAuthorConfig = {
    iconURL: `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`,
    name: `Sonia`,
    url: `https://github.com/Sonia-corporation?type=source`,
  };
  public id = `unknown`;
  public secretToken = `unknown`;
}
