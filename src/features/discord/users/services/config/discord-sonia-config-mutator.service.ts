import _ from "lodash";
import { AbstractConfigService } from "../../../../../classes/abstract-config.service";
import { PartialNested } from "../../../../../types/partial-nested";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordSoniaConfig } from "../../../interfaces/discord-sonia-config";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordSoniaConfigValueNameEnum } from "../../enums/discord-sonia-config-value-name.enum";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";
import { DiscordSoniaConfigService } from "./discord-sonia-config.service";

export class DiscordSoniaConfigMutatorService extends AbstractConfigService<
  IDiscordConfig
> {
  private static _instance: DiscordSoniaConfigMutatorService;

  public static getInstance(
    config?: Readonly<PartialNested<IDiscordConfig>>
  ): DiscordSoniaConfigMutatorService {
    if (_.isNil(DiscordSoniaConfigMutatorService._instance)) {
      DiscordSoniaConfigMutatorService._instance = new DiscordSoniaConfigMutatorService(
        config
      );
    }

    return DiscordSoniaConfigMutatorService._instance;
  }

  protected readonly _discordSoniaConfigCoreService: DiscordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
  protected readonly _discordSoniaConfigService: DiscordSoniaConfigService = DiscordSoniaConfigService.getInstance();

  protected constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(`DiscordSoniaConfigMutatorService`, config);
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateSonia(config.sonia);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateSonia(
    sonia?: Readonly<PartialNested<IDiscordSoniaConfig>>
  ): void {
    if (!_.isNil(sonia)) {
      this.updateCorporationImageUrl(sonia.corporationImageUrl);
      this.updateCorporationMessageEmbedAuthor(
        sonia.corporationMessageEmbedAuthor
      );
      this.updateId(sonia.id);
      this.updateSecretToken(sonia.secretToken);
    }
  }

  public updateCorporationImageUrl(
    corporationImageUrl?: Readonly<string>
  ): void {
    this._discordSoniaConfigCoreService.corporationImageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: corporationImageUrl,
        oldValue: this._discordSoniaConfigService.getCorporationImageUrl(),
        valueName: DiscordSoniaConfigValueNameEnum.CORPORATION_IMAGE_URL,
      }
    );
  }

  public updateCorporationMessageEmbedAuthor(
    corporationMessageEmbedAuthor?: Readonly<
      PartialNested<IDiscordSoniaCorporationMessageEmbedAuthorConfig>
    >
  ): void {
    if (!_.isNil(corporationMessageEmbedAuthor)) {
      this.updateCorporationMessageEmbedAuthorIconUrl(
        corporationMessageEmbedAuthor.iconURL
      );
      this.updateCorporationMessageEmbedAuthorName(
        corporationMessageEmbedAuthor.name
      );
      this.updateCorporationMessageEmbedAuthorUrl(
        corporationMessageEmbedAuthor.url
      );
    }
  }

  public updateCorporationMessageEmbedAuthorIconUrl(
    iconUrl?: Readonly<string>
  ): void {
    this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor.iconURL = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: iconUrl,
        oldValue: this._discordSoniaConfigService.getCorporationMessageEmbedAuthorIconUrl(),
        valueName:
          DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_ICON_URL,
      }
    );
  }

  public updateCorporationMessageEmbedAuthorName(
    name?: Readonly<string>
  ): void {
    this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor.name = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: name,
        oldValue: this._discordSoniaConfigService.getCorporationMessageEmbedAuthorName(),
        valueName:
          DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_NAME,
      }
    );
  }

  public updateCorporationMessageEmbedAuthorUrl(url?: Readonly<string>): void {
    this._discordSoniaConfigCoreService.corporationMessageEmbedAuthor.url = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: url,
        oldValue: this._discordSoniaConfigService.getCorporationMessageEmbedAuthorUrl(),
        valueName:
          DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_URL,
      }
    );
  }

  public updateId(id?: Readonly<string>): void {
    this._discordSoniaConfigCoreService.id = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        isValueHidden: true,
        newValue: id,
        oldValue: this._discordSoniaConfigService.getId(),
        valueName: DiscordSoniaConfigValueNameEnum.ID,
      }
    );
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    this._discordSoniaConfigCoreService.secretToken = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        isValueHidden: true,
        newValue: secretToken,
        oldValue: this._discordSoniaConfigService.getSecretToken(),
        valueName: DiscordSoniaConfigValueNameEnum.SECRET_TOKEN,
      }
    );
  }
}
