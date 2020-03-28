import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import { AbstractConfigService } from '../../../../classes/abstract-config-service';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
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
    if (_.isString(corporationImageUrl)) {
      DISCORD_SONIA_CONFIG.corporationImageUrl = corporationImageUrl;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`corporation image url updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_SONIA_CONFIG.corporationImageUrl))}`)
      });
    }
  }

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor;
  }

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
    if (_.isString(iconUrl)) {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL = iconUrl;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`corporation message embed author icon url updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL))}`)
      });
    }
  }

  public getCorporationMessageEmbedAuthorName(): string {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name;
  }

  public updateCorporationMessageEmbedAuthorName(name?: Readonly<string>): void {
    if (_.isString(name)) {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name = name;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`corporation message embed author name updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name))}`)
      });
    }
  }

  public getCorporationMessageEmbedAuthorUrl(): string {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url;
  }

  public updateCorporationMessageEmbedAuthorUrl(url?: Readonly<string>): void {
    if (_.isString(url)) {
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url = url;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`corporation message embed author url updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url))}`)
      });
    }
  }

  public getId(): string {
    return DISCORD_SONIA_CONFIG.id;
  }

  public updateId(id?: Readonly<string>): void {
    if (_.isString(id)) {
      DISCORD_SONIA_CONFIG.id = id;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`id updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_SONIA_CONFIG.id))}`)
      });
    }
  }

  public getSecretToken(): string {
    return DISCORD_SONIA_CONFIG.secretToken;
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      DISCORD_SONIA_CONFIG.secretToken = secretToken;

      this._loggerService.log({
        context: this._className,
        message: this._loggerService.getHiddenValueUpdate(`secret token updated to: `, true)
      });
    }
  }
}
