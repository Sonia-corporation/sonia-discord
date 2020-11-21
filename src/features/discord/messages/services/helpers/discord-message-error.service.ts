import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { ellipsis } from '../../../../../functions/formatters/ellipsis';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../channels/services/discord-channel.service';
import { DiscordGuildSoniaChannelNameEnum } from '../../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildConfigService } from '../../../guilds/services/config/discord-guild-config.service';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageErrorService extends AbstractService {
  private static _instance: DiscordMessageErrorService;

  public static getInstance(): DiscordMessageErrorService {
    if (_.isNil(DiscordMessageErrorService._instance)) {
      DiscordMessageErrorService._instance = new DiscordMessageErrorService();
    }

    return DiscordMessageErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_ERROR_SERVICE);
  }

  public handleError(error: unknown, anyDiscordMessage: Readonly<IAnyDiscordMessage>): void {
    this._logOnError(error, anyDiscordMessage);
    this._sendMessage(error, anyDiscordMessage);
  }

  private _sendMessage(error: unknown, anyDiscordMessage: Readonly<IAnyDiscordMessage>): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(error, anyDiscordMessage);

    this._sendMessageToOriginalChannel(anyDiscordMessage, messageResponse);
    this._sendMessageToSoniaDiscord(messageResponse);
  }

  private _sendMessageToOriginalChannel(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    { response, options }: Readonly<IDiscordMessageResponse>
  ): void {
    if (DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
      anyDiscordMessage.channel
        .send(response, options)
        .then((): void => {
          LoggerService.getInstance().log({
            context: this._serviceName,
            hasExtendedContext: true,
            message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message sent`),
          });
        })
        .catch((error: unknown): void => {
          this._logOnError(error, anyDiscordMessage);
        });
    }
  }

  private _sendMessageToSoniaDiscord(messageResponse: Readonly<IDiscordMessageResponse>): void {
    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse,
    });
  }

  private _logOnError(error: unknown, { id }: Readonly<IAnyDiscordMessage>): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(id, `message sending failed`),
    });
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(id, error),
    });
  }

  private _getMessageResponse(
    error: unknown,
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._getErrorMessageResponse(error, anyDiscordMessage);
  }

  private _getErrorMessageResponse(
    error: unknown,
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getMessageEmbed(error, anyDiscordMessage),
        split: false,
      },
      response: ``,
    };
  }

  private _getMessageEmbed(error: unknown, anyDiscordMessage: Readonly<IAnyDiscordMessage>): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      fields: this._getMessageEmbedFields(error, anyDiscordMessage),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedFields(error: unknown, anyDiscordMessage: Readonly<IAnyDiscordMessage>): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldMessageId(anyDiscordMessage),
      this._getMessageEmbedFieldError(error),
      this._getMessageEmbedFieldHint(),
    ];
  }

  private _getMessageEmbedFieldMessageId({ id }: Readonly<IAnyDiscordMessage>): EmbedFieldData {
    return {
      name: `The message's id that killed me`,
      value: id,
    };
  }

  private _getMessageEmbedFieldError(error: unknown): EmbedFieldData {
    return {
      name: `My blood trace`,
      value: ellipsis(_.toString(error)),
    };
  }

  private _getMessageEmbedFieldHint(): EmbedFieldData {
    const githubBugReportUrl: string = GithubConfigService.getInstance().getBugReportUrl();
    const discordSoniaPermanentGuildInviteUrl: string = DiscordGuildConfigService.getInstance().getSoniaPermanentGuildInviteUrl();

    return {
      name: `Help me to help you`,
      value: `You can create a [bug report](${githubBugReportUrl}) or reach my creators on [discord](${discordSoniaPermanentGuildInviteUrl}).`,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `I am very sorry for that`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Oops, you have found a bug`;
  }
}
