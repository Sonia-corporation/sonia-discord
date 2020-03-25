import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import moment from 'moment';
import { LoggerService } from '../../logger/logger-service';
import { DiscordChannelService } from '../channels/discord-channel-service';
import { IDiscordMessageErrorConfig } from '../interfaces/discord-message-error-config';
import { DiscordSoniaService } from '../users/discord-sonia-service';
import { DiscordMessageConfigService } from './discord-message-config-service';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';
import { AnyDiscordMessage } from './types/any-discord-message';

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
      const messageResponse: IDiscordMessageResponse = this._getMessageResponse(error);

      message.channel.send(messageResponse.response, messageResponse.options).then((): void => {
        this._loggerService.log(this._className, this._loggerService.getSnowflakeContext(message.id, `message sent`), true);
      }).catch((error: unknown): void => {
        this._logOnError(error, message);
      });
    }
  }

  private _logOnError(
    error: unknown,
    message: Readonly<AnyDiscordMessage>
  ): void {
    this._loggerService.error(this._className, this._loggerService.getSnowflakeContext(message.id, `message sending failed`), true);
    this._loggerService.error(this._className, this._loggerService.getSnowflakeContext(message.id, error), true);
  }

  private _getMessageResponse(error: unknown): IDiscordMessageResponse {
    return this._getErrorMessageResponse(error);
  }

  private _getErrorMessageResponse(error: unknown): IDiscordMessageResponse {
    const soniaImageUrl: string | null = this._discordSoniaService.getImageUrl();
    const author: MessageEmbedAuthor = this._discordSoniaService.getCorporationMessageEmbedAuthor();
    const discordMessageErrorConfig: IDiscordMessageErrorConfig = this._discordMessageConfigService.getMessageError();

    return {
      options: {
        embed: {
          author,
          color: discordMessageErrorConfig.imageColor,
          description: _.isString(error) ? error : undefined,
          footer: {
            iconURL: soniaImageUrl || undefined,
            text: `Sonia is sorry`
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

