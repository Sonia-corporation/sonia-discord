import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import { AbstractConfigService } from '../../../../classes/abstract-config-service';
import { PartialNested } from '../../../../types/partial-nested';
import { IDiscordConfig } from '../../interfaces/discord-config';
import { IDiscordSoniaConfig } from '../../interfaces/discord-sonia-config';
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from '../../interfaces/discord-sonia-corporation-message-embed-author-config';
import { DISCORD_SONIA_CONFIG } from '../constants/discord-sonia-config';

export class DiscordSoniaConfigService extends AbstractConfigService<IDiscordConfig> {
  private static _instance: DiscordSoniaConfigService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordSoniaConfigService {
    if (_.isNil(DiscordSoniaConfigService._instance)) {
      DiscordSoniaConfigService._instance = new DiscordSoniaConfigService(config);
    }

    return DiscordSoniaConfigService._instance;
  }

  protected readonly _className = `DiscordSoniaConfigService`;

  protected constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(config);
  }

  // @todo add coverage
  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateSonia(config.sonia);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }

  public getSonia(): IDiscordSoniaConfig {
    return DISCORD_SONIA_CONFIG;
  }

  // @todo add coverage
  public updateSonia(sonia?: Readonly<PartialNested<IDiscordSoniaConfig>>): void {
    if (!_.isNil(sonia)) {
      this.updateCorporationImageUrl(sonia.corporationImageUrl);
      this.updateCorporationMessageEmbedAuthor(sonia.corporationMessageEmbedAuthor);
      this.updateId(sonia.id);
      this.updateSecretToken(sonia.secretToken);
    }
  }

  public getCorporationImageUrl(): string {
    return DISCORD_SONIA_CONFIG.corporationImageUrl;
  }

  public updateCorporationImageUrl(corporationImageUrl?: Readonly<string>): void {
    DISCORD_SONIA_CONFIG.corporationImageUrl = this._configService.getUpdatedString({
      context: this._className,
      newValue: corporationImageUrl,
      oldValue: DISCORD_SONIA_CONFIG.corporationImageUrl,
      valueName: `corporation image url`
    });
  }

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor;
  }

  // @todo add coverage
  public updateCorporationMessageEmbedAuthor(corporationMessageEmbedAuthor?: Readonly<PartialNested<IDiscordSoniaCorporationMessageEmbedAuthorConfig>>): void {
    if (!_.isNil(corporationMessageEmbedAuthor) && _.isPlainObject(corporationMessageEmbedAuthor)) {
      this.updateCorporationMessageEmbedAuthorIconUrl(corporationMessageEmbedAuthor.iconURL);
      this.updateCorporationMessageEmbedAuthorName(corporationMessageEmbedAuthor.name);
      this.updateCorporationMessageEmbedAuthorUrl(corporationMessageEmbedAuthor.url);
    }
  }

  public getCorporationMessageEmbedAuthorIconUrl(): string {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL;
  }

  public updateCorporationMessageEmbedAuthorIconUrl(iconUrl?: Readonly<string>): void {
    DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL = this._configService.getUpdatedString({
      context: this._className,
      newValue: iconUrl,
      oldValue: DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL,
      valueName: `corporation message embed author icon url`
    });
  }

  public getCorporationMessageEmbedAuthorName(): string {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name;
  }

  public updateCorporationMessageEmbedAuthorName(name?: Readonly<string>): void {
    DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name = this._configService.getUpdatedString({
      context: this._className,
      newValue: name,
      oldValue: DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name,
      valueName: `corporation message embed author name`
    });
  }

  public getCorporationMessageEmbedAuthorUrl(): string {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url;
  }

  public updateCorporationMessageEmbedAuthorUrl(url?: Readonly<string>): void {
    DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url = this._configService.getUpdatedString({
      context: this._className,
      newValue: url,
      oldValue: DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url,
      valueName: `corporation message embed author url`
    });
  }

  public getId(): string {
    return DISCORD_SONIA_CONFIG.id;
  }

  public updateId(id?: Readonly<string>): void {
    DISCORD_SONIA_CONFIG.id = this._configService.getUpdatedString({
      context: this._className,
      newValue: id,
      oldValue: DISCORD_SONIA_CONFIG.id,
      valueName: `id`
    });
  }

  public getSecretToken(): string {
    return DISCORD_SONIA_CONFIG.secretToken;
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    DISCORD_SONIA_CONFIG.secretToken = this._configService.getUpdatedString({
      context: this._className,
      newValue: secretToken,
      oldValue: DISCORD_SONIA_CONFIG.secretToken,
      valueName: `secret token`
    });
  }
}
