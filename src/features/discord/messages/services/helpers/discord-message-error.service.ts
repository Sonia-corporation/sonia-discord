import { DiscordCommandErrorCoreService } from './discord-command-error-core.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { ellipsis } from '../../../../../functions/formatters/ellipsis';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { LoggerConfigService } from '../../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../channels/services/discord-channel.service';
import { DiscordGuildSoniaChannelNameEnum } from '../../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildConfigService } from '../../../guilds/services/config/discord-guild-config.service';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { APIEmbed, APIEmbedField } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageErrorService extends DiscordCommandErrorCoreService {
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

  /**
   * @description
   * Provide a simple and yet good UX to handle an error.
   * The error will be sent to the channel that caused it.
   * It will also be sent to the Sonia Guild errors channel.
   * It will also be logged.
   * @param {unknown}            error             The error that happened.
   * @param {IAnyDiscordMessage} anyDiscordMessage The original message.
   * @param {string}             logMessage        The custom error message to display (optional). The default is "message sending failed".
   */
  public handleError(error: unknown, anyDiscordMessage: IAnyDiscordMessage, logMessage?: string): void {
    this._logOnError(error, anyDiscordMessage, logMessage);
    this._sendMessage(error, anyDiscordMessage);
  }

  private _sendMessage(error: unknown, anyDiscordMessage: IAnyDiscordMessage): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(error, anyDiscordMessage);

    this._sendMessageToOriginalChannel(anyDiscordMessage, messageResponse);
    this._sendMessageToSoniaDiscord(messageResponse);
  }

  private _sendMessageToOriginalChannel(
    anyDiscordMessage: IAnyDiscordMessage,
    { content, options }: IDiscordMessageResponse
  ): void {
    if (DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
      anyDiscordMessage.channel
        .send({
          ...options,
          content,
        })
        .then((): void => {
          if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
            LoggerService.getInstance().log({
              context: this._serviceName,
              hasExtendedContext: true,
              message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message sent`),
            });
          }
        })
        .catch((error: Error): void => {
          this._logOnError(error, anyDiscordMessage);
        });
    }
  }

  private _sendMessageToSoniaDiscord(messageResponse: IDiscordMessageResponse): void {
    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse,
    });
  }

  private _logOnError(error: unknown, { id }: IAnyDiscordMessage, logMessage?: string): void {
    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        hasExtendedContext: true,
        message: LoggerService.getInstance().getSnowflakeContext(
          id,
          _.isString(logMessage) ? logMessage : `message sending failed`
        ),
      });
    }

    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(id, error),
    });
  }

  private _getMessageResponse(error: unknown, anyDiscordMessage: IAnyDiscordMessage): IDiscordMessageResponse {
    return this._getErrorMessageResponse(error, anyDiscordMessage);
  }

  private _getErrorMessageResponse(error: unknown, anyDiscordMessage: IAnyDiscordMessage): IDiscordMessageResponse {
    const options: APIEmbed = {
      fields: this._getMessageEmbedFields(error, anyDiscordMessage),
      title: this._getCustomMessageEmbedTitle(),
    };

    return {
      options: {
        embeds: [_.merge({}, this._getMessageEmbed(), options)],
      },
    };
  }

  private _getMessageEmbedFields(error: unknown, anyDiscordMessage: IAnyDiscordMessage): APIEmbedField[] {
    return [
      this._getMessageEmbedFieldMessageId(anyDiscordMessage),
      this._getMessageEmbedFieldError(error),
      this._getMessageEmbedFieldHint(),
    ];
  }

  private _getMessageEmbedFieldMessageId({ id }: IAnyDiscordMessage): APIEmbedField {
    return {
      inline: false,
      name: `The message's id that killed me`,
      value: id,
    };
  }

  private _getMessageEmbedFieldError(error: unknown): APIEmbedField {
    return {
      inline: false,
      name: `My blood trace`,
      value: ellipsis(_.toString(error)),
    };
  }

  private _getMessageEmbedFieldHint(): APIEmbedField {
    const githubBugReportUrl: string = GithubConfigService.getInstance().getBugReportUrl();
    const discordSoniaPermanentGuildInviteUrl: string =
      DiscordGuildConfigService.getInstance().getSoniaPermanentGuildInviteUrl();

    return {
      inline: false,
      name: `Help me to help you`,
      value: `You can create a [bug report](${githubBugReportUrl}) or reach my creators on [discord](${discordSoniaPermanentGuildInviteUrl}).`,
    };
  }

  private _getCustomMessageEmbedTitle(): string {
    return `Oops, you have found a bug`;
  }
}
