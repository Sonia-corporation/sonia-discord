import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordGuildSoniaChannelNameEnum } from '../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../guilds/services/discord-guild-sonia.service';
import { IDiscordMessageResponse } from '../../messages/interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../../messages/services/config/discord-message-config.service';
import { DiscordSoniaService } from '../../users/services/discord-sonia.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordLoggerWarningService extends AbstractService {
  private static _instance: DiscordLoggerWarningService;

  public static getInstance(): DiscordLoggerWarningService {
    if (_.isNil(DiscordLoggerWarningService._instance)) {
      DiscordLoggerWarningService._instance = new DiscordLoggerWarningService();
    }

    return DiscordLoggerWarningService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_WARNING_SERVICE);
  }

  public handleWarning(warning: string): void {
    LoggerService.getInstance().warning({
      context: this._serviceName,
      message: ChalkService.getInstance().text(warning),
    });
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`send message to Sonia Discord warnings channel`),
    });

    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.WARNINGS,
      messageResponse: this.getWarningMessageResponse(warning),
    });
  }

  public getWarningMessageResponse(warning: string): IDiscordMessageResponse {
    return {
      options: {
        embeds: [this._getMessageEmbed(warning)],
      },
    };
  }

  private _getMessageEmbed(warning: string): APIEmbed {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageEmbedDescription(warning),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): APIEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): APIEmbedImage {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageWarningImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): APIEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      icon_url: soniaImageUrl ?? undefined,
      text: `Discord warning`,
    };
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageWarningImageColor();
  }

  private _getMessageEmbedTimestamp(): string {
    return moment().toISOString();
  }

  private _getMessageEmbedTitle(): string {
    return `Warning!`;
  }

  private _getMessageEmbedDescription(warning: string): string {
    return warning;
  }
}
