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

  private readonly _discordSoniaConfigCoreService: DiscordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();

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
    return this._discordSoniaConfigCoreService.corporationImageUrl;
  }

  public getCorporationMessageEmbedAuthor(): IDiscordSoniaCorporationMessageEmbedAuthorConfig {
    return this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor;
  }

  public getCorporationMessageEmbedAuthorIconUrl(): string {
    return this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor
      .iconURL;
  }

  public getCorporationMessageEmbedAuthorName(): string {
    return this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor
      .name;
  }

  public getCorporationMessageEmbedAuthorUrl(): string {
    return this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor
      .url;
  }

  public getId(): string {
    return this._discordSoniaConfigCoreService.id;
  }

  public getSecretToken(): string {
    return this._discordSoniaConfigCoreService.secretToken;
  }
}
