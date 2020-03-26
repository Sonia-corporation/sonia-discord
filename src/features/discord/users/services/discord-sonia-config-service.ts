import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import { ConfigService } from '../../../../classes/config-service';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { PartialNested } from '../../../../types/partial-nested';
import { IDiscordConfig } from '../../interfaces/discord-config';
import { IDiscordSoniaConfig } from '../../interfaces/discord-sonia-config';
import { DISCORD_SONIA_CONFIG } from '../constants/discord-sonia-config';

export class DiscordSoniaConfigService extends ConfigService<IDiscordConfig> {
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

  public getSonia(): IDiscordSoniaConfig {
    return DISCORD_SONIA_CONFIG;
  }

  public updateSonia(sonia?: Readonly<PartialNested<IDiscordSoniaConfig>>): void {
    if (!_.isNil(sonia)) {
      this.updateId(sonia.id);
      this.updateSecretToken(sonia.secretToken);
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

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor;
  }

  public getCorporationImageUrl(): string {
    return DISCORD_SONIA_CONFIG.corporationImageUrl;
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
}
