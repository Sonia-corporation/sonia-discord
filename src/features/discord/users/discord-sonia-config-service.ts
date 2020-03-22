import { MessageEmbedAuthor } from "discord.js";
import _ from 'lodash';
import { PartialNested } from '../../../types/partial-nested';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { IDiscordConfig } from '../interfaces/discord-config';
import { IDiscordSoniaConfig } from '../interfaces/discord-sonia-config';
import { DISCORD_SONIA_CONFIG } from './discord-sonia-config';

export class DiscordSoniaConfigService {
  private static _instance: DiscordSoniaConfigService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordSoniaConfigService {
    if (_.isNil(DiscordSoniaConfigService._instance)) {
      DiscordSoniaConfigService._instance = new DiscordSoniaConfigService(config);
    }

    return DiscordSoniaConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = 'DiscordSoniaConfigService';

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    this.updateConfig(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateSonia(config.sonia);

      this._loggerService.debug(this._className, this._chalkService.text(`configuration updated`));
    }
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

      this._loggerService.log(this._className, this._chalkService.text(`id updated to: ${this._chalkService.value(`"${DISCORD_SONIA_CONFIG.id}"`)}`));
    }
  }

  public getSecretToken(): string {
    return DISCORD_SONIA_CONFIG.secretToken;
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      DISCORD_SONIA_CONFIG.secretToken = secretToken;

      this._loggerService.log(this._className, this._loggerService.getHiddenValueUpdate('secretToken updated to: ', true));
    }
  }

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    return DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor;
  }
}
