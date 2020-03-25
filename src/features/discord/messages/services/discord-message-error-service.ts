import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import moment from 'moment';
import { ellipsis } from '../../../../functions/ellipsis';
import { GithubConfigService } from '../../../github/services/github-config-service';
import { LoggerService } from '../../../logger/services/logger-service';
import { DiscordChannelService } from '../../channels/services/discord-channel-service';
import { DiscordGuildConfigService } from '../../guilds/services/discord-guild-config-service';
import { IDiscordMessageErrorConfig } from '../../interfaces/discord-message-error-config';
import { DiscordSoniaService } from '../../users/services/discord-sonia-service';
import { IDiscordMessageResponse } from '../interfaces/discord-message-response';
import { AnyDiscordMessage } from '../types/any-discord-message';
import { DiscordMessageConfigService } from './discord-message-config-service';

export class DiscordMessageErrorService {
  private static _instance: DiscordMessageErrorService;

  public static getInstance(): DiscordMessageErrorService {
    if (_.isNil(DiscordMessageErrorService._instance)) {
      DiscordMessageErrorService._instance = new DiscordMessageErrorService();
    }

    return DiscordMessageErrorService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordChannelService = DiscordChannelService.getInstance();
  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _githubConfigService = GithubConfigService.getInstance();
  private readonly _discordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _className = `DiscordMessageErrorService`;

  public handleError(
    error: unknown,
    message: Readonly<AnyDiscordMessage>
  ): void {
    this._logOnError(error, message);

    this._sendMessage(error, message);
  }

  private _sendMessage(
    error: unknown,
    message: Readonly<AnyDiscordMessage>
  ): void {
    if (this._discordChannelService.isValid(message.channel)) {
      const messageResponse: IDiscordMessageResponse = this._getMessageResponse(error, message);

      message.channel.send(messageResponse.response, messageResponse.options).then((): void => {
        this._loggerService.log({
          context: this._className,
          extendedContext: true,
          message: this._loggerService.getSnowflakeContext(message.id, `message sent`)
        });
      }).catch((error: unknown): void => {
        this._logOnError(error, message);
      });
    }
  }

  private _logOnError(
    error: unknown,
    message: Readonly<AnyDiscordMessage>
  ): void {
    this._loggerService.error({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(message.id, `message sending failed`)
    });
    this._loggerService.error({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(message.id, error)
    });
  }

  private _getMessageResponse(
    error: unknown,
    message: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._getErrorMessageResponse(error, message);
  }

  private _getErrorMessageResponse(
    error: unknown,
    message: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    const soniaImageUrl: string | null = this._discordSoniaService.getImageUrl();
    const author: MessageEmbedAuthor = this._discordSoniaService.getCorporationMessageEmbedAuthor();
    const discordMessageErrorConfig: IDiscordMessageErrorConfig = this._discordMessageConfigService.getMessageError();
    const githubBugReportUrl: string = this._githubConfigService.getBugReportUrl();
    const discordSoniaPermanentGuildInviteUrl: string = this._discordGuildConfigService.getSoniaPermanentGuildInviteUrl();

    return {
      options: {
        embed: {
          author,
          color: discordMessageErrorConfig.imageColor,
          fields: [
            {
              name: `The message's id that killed me`,
              value: message.id
            },
            {
              name: `My blood trace`,
              value: ellipsis(_.toString(error))
            },
            {
              name: `Help me to help you`,
              value: `You can create a [bug report](${githubBugReportUrl}) or reach my creators on [discord](${discordSoniaPermanentGuildInviteUrl}).`
            }
          ],
          footer: {
            iconURL: soniaImageUrl || undefined,
            text: `I am very sorry for that`
          },
          thumbnail: {
            url: discordMessageErrorConfig.imageUrl
          },
          timestamp: moment().toDate(),
          title: `Oops, you have found a bug`
        },
        split: true
      },
      response: ``
    };
  }
}

