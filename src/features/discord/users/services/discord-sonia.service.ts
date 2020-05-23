import { MessageEmbedAuthor } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { addDiscordDevPrefix } from "../../functions/dev-prefix/add-discord-dev-prefix";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordClientService } from "../../services/discord-client.service";
import { isDiscordClientUser } from "../functions/is-discord-client-user";
import { Sonia } from "../types/sonia";
import { DiscordSoniaConfigService } from "./config/discord-sonia-config.service";

export class DiscordSoniaService extends AbstractService {
  private static _instance: DiscordSoniaService;

  public static getInstance(): DiscordSoniaService {
    if (_.isNil(DiscordSoniaService._instance)) {
      DiscordSoniaService._instance = new DiscordSoniaService();
    }

    return DiscordSoniaService._instance;
  }

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _discordSoniaConfigService: DiscordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  private readonly _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_SONIA_SERVICE);
  }

  public isSonia(id: Readonly<string>): boolean {
    return _.isEqual(id, this._discordSoniaConfigService.getId());
  }

  public getSonia(): Sonia | null {
    return this._discordClientService.getClient().user;
  }

  public getFullName(): string | null {
    const sonia: Sonia | null = this.getSonia();

    if (!_.isNil(sonia)) {
      return `${sonia.username}#${sonia.discriminator}`;
    }

    return null;
  }

  public isValid(sonia: unknown): sonia is Sonia {
    return isDiscordClientUser(sonia);
  }

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    const discordSoniaCorporationMessageEmbedAuthorConfig: IDiscordSoniaCorporationMessageEmbedAuthorConfig = this._discordSoniaConfigService.getCorporationMessageEmbedAuthor();

    return {
      iconURL: discordSoniaCorporationMessageEmbedAuthorConfig.iconURL,
      name: this.getCorporationMessageEmbedAuthorName(),
      url: discordSoniaCorporationMessageEmbedAuthorConfig.url,
    };
  }

  public getCorporationMessageEmbedAuthorName(): string {
    const discordSoniaCorporationMessageEmbedAuthorConfigName: string = this._discordSoniaConfigService.getCorporationMessageEmbedAuthorName();

    if (!this._appConfigService.isProduction()) {
      return addDiscordDevPrefix({
        discordId: this._profileConfigService.getDiscordId(),
        hasEmphasis: false,
        message: discordSoniaCorporationMessageEmbedAuthorConfigName,
        nickname: this._profileConfigService.getNickname(),
      });
    }

    return discordSoniaCorporationMessageEmbedAuthorConfigName;
  }

  public getCorporationImageUrl(): string {
    return this._discordSoniaConfigService.getCorporationImageUrl();
  }

  public getImageUrl(): string | null {
    const sonia: Sonia | null = this.getSonia();

    if (!_.isNil(sonia)) {
      return sonia.displayAvatarURL();
    }

    return null;
  }
}
