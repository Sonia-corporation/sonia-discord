import _ from "lodash";
import { AbstractService } from "../../../../../classes/abstract.service";
import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { IDiscordSoniaConfig } from "../../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";

export class DiscordSoniaConfigService extends AbstractService {
  private static _instance: DiscordSoniaConfigService;

  public static getInstance(): DiscordSoniaConfigService {
    if (_.isNil(DiscordSoniaConfigService._instance)) {
      DiscordSoniaConfigService._instance = new DiscordSoniaConfigService();
    }

    return DiscordSoniaConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_SONIA_CONFIG_SERVICE);
  }

  public getConfig(): IDiscordSoniaConfig {
    return {
      corporationImageUrl: this.getCorporationImageUrl(),
      corporationMessageEmbedAuthor: this.getCorporationMessageEmbedAuthor(),
      id: this.getId(),
      secretToken: this.getSecretToken(),
    };
  }

  public getCorporationImageUrl(): IconEnum {
    return DiscordSoniaConfigCoreService.getInstance().corporationImageUrl;
  }

  public getCorporationMessageEmbedAuthor(): IDiscordSoniaCorporationMessageEmbedAuthorConfig {
    return DiscordSoniaConfigCoreService.getInstance()
      .corporationMessageEmbedAuthor;
  }

  public getCorporationMessageEmbedAuthorIconUrl(): string {
    return DiscordSoniaConfigCoreService.getInstance()
      .corporationMessageEmbedAuthor.iconURL;
  }

  public getCorporationMessageEmbedAuthorName(): string {
    return DiscordSoniaConfigCoreService.getInstance()
      .corporationMessageEmbedAuthor.name;
  }

  public getCorporationMessageEmbedAuthorUrl(): string {
    return DiscordSoniaConfigCoreService.getInstance()
      .corporationMessageEmbedAuthor.url;
  }

  public getId(): string {
    return DiscordSoniaConfigCoreService.getInstance().id;
  }

  public getSecretToken(): string {
    return DiscordSoniaConfigCoreService.getInstance().secretToken;
  }
}
