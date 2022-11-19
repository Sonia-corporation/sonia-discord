import { DiscordSoniaConfigCoreService } from './discord-sonia-config-core.service';
import { DiscordSoniaConfigService } from './discord-sonia-config.service';
import { AbstractConfigService } from '../../../../../classes/services/abstract-config.service';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { removeUndefined } from '../../../../../functions/formatters/remove-undefined';
import { IPartialNested } from '../../../../../types/partial-nested';
import { ConfigService } from '../../../../config/services/config.service';
import { ChalkService } from '../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { IDiscordConfig } from '../../../interfaces/discord-config';
import { IDiscordSoniaConfig } from '../../../interfaces/discord-sonia-config';
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from '../../../interfaces/discord-sonia-corporation-message-embed-author-config';
import { DiscordSoniaConfigValueNameEnum } from '../../enums/discord-sonia-config-value-name.enum';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordSoniaConfigMutatorService extends AbstractConfigService<IDiscordConfig> {
  private static _instance: DiscordSoniaConfigMutatorService;

  public static getInstance(config?: IPartialNested<IDiscordConfig>): DiscordSoniaConfigMutatorService {
    if (_.isNil(DiscordSoniaConfigMutatorService._instance)) {
      DiscordSoniaConfigMutatorService._instance = new DiscordSoniaConfigMutatorService(config);
    }

    return DiscordSoniaConfigMutatorService._instance;
  }

  public constructor(config?: IPartialNested<IDiscordConfig>) {
    super(ServiceNameEnum.DISCORD_SONIA_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    DiscordSoniaConfigCoreService.getInstance();
    DiscordSoniaConfigService.getInstance();
  }

  public updateConfig(config?: IPartialNested<IDiscordConfig>): void {
    if (!_.isNil(config)) {
      this.updateSonia(config.sonia);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateSonia(sonia?: IPartialNested<IDiscordSoniaConfig>): void {
    if (!_.isNil(sonia)) {
      this.updateCorporationImageUrl(sonia.corporationImageUrl);
      this.updateCorporationMessageEmbedAuthor(sonia.corporationMessageEmbedAuthor);
      this.updateDevGuildIdWhitelist(sonia.devGuildIdWhitelist);
      this.updateId(sonia.id);
      this.updateSecretToken(sonia.secretToken);
    }
  }

  public updateCorporationImageUrl(corporationImageUrl?: IconEnum): void {
    DiscordSoniaConfigCoreService.getInstance().corporationImageUrl = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: corporationImageUrl,
      oldValue: DiscordSoniaConfigService.getInstance().getCorporationImageUrl(),
      valueName: DiscordSoniaConfigValueNameEnum.CORPORATION_IMAGE_URL,
    });
  }

  public updateCorporationMessageEmbedAuthor(
    corporationMessageEmbedAuthor?: IPartialNested<IDiscordSoniaCorporationMessageEmbedAuthorConfig>
  ): void {
    if (!_.isNil(corporationMessageEmbedAuthor)) {
      this.updateCorporationMessageEmbedAuthorIconUrl(corporationMessageEmbedAuthor.iconURL);
      this.updateCorporationMessageEmbedAuthorName(corporationMessageEmbedAuthor.name);
      this.updateCorporationMessageEmbedAuthorUrl(corporationMessageEmbedAuthor.url);
    }
  }

  public updateCorporationMessageEmbedAuthorIconUrl(iconUrl?: string): void {
    DiscordSoniaConfigCoreService.getInstance().corporationMessageEmbedAuthor.iconURL =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: iconUrl,
        oldValue: DiscordSoniaConfigService.getInstance().getCorporationMessageEmbedAuthorIconUrl(),
        valueName: DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_ICON_URL,
      });
  }

  public updateCorporationMessageEmbedAuthorName(name?: string): void {
    DiscordSoniaConfigCoreService.getInstance().corporationMessageEmbedAuthor.name =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: name,
        oldValue: DiscordSoniaConfigService.getInstance().getCorporationMessageEmbedAuthorName(),
        valueName: DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_NAME,
      });
  }

  public updateCorporationMessageEmbedAuthorUrl(url?: string): void {
    DiscordSoniaConfigCoreService.getInstance().corporationMessageEmbedAuthor.url =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: url,
        oldValue: DiscordSoniaConfigService.getInstance().getCorporationMessageEmbedAuthorUrl(),
        valueName: DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_URL,
      });
  }

  public updateDevGuildIdWhitelist(whitelist?: Snowflake | undefined[]): void {
    let updatedDevGuildIdWhitelist: string[] | undefined;

    if (_.isArray(whitelist)) {
      updatedDevGuildIdWhitelist = removeUndefined(whitelist);
    }

    DiscordSoniaConfigCoreService.getInstance().devGuildIdWhitelist = ConfigService.getInstance().getUpdatedArray({
      context: this._serviceName,
      isValueHidden: true,
      newValue: updatedDevGuildIdWhitelist,
      oldValue: DiscordSoniaConfigService.getInstance().getDevGuildIdWhitelist(),
      valueName: DiscordSoniaConfigValueNameEnum.DEV_GUILD_ID_WHITELIST,
    });
  }

  public updateId(id?: Snowflake): void {
    DiscordSoniaConfigCoreService.getInstance().id = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      isValueHidden: true,
      newValue: id,
      oldValue: DiscordSoniaConfigService.getInstance().getId(),
      valueName: DiscordSoniaConfigValueNameEnum.ID,
    });
  }

  public updateSecretToken(secretToken?: string): void {
    DiscordSoniaConfigCoreService.getInstance().secretToken = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      isValueHidden: true,
      newValue: secretToken,
      oldValue: DiscordSoniaConfigService.getInstance().getSecretToken(),
      valueName: DiscordSoniaConfigValueNameEnum.SECRET_TOKEN,
    });
  }
}
