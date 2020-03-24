import _ from 'lodash';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { DiscordChannelService } from '../channels/discord-channel-service';
import { DiscordClientService } from '../discord-client-service';
import { DiscordAuthorService } from '../users/discord-author-service';
import { DiscordMessageDmService } from './discord-message-dm-service';
import { DiscordMessageTextService } from './discord-message-text-service';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessageService {
  private static _instance: DiscordMessageService;

  public static getInstance(): DiscordMessageService {
    if (_.isNil(DiscordMessageService._instance)) {
      DiscordMessageService._instance = new DiscordMessageService();
    }

    return DiscordMessageService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _discordChannelService = DiscordChannelService.getInstance();
  private readonly _discordMessageDmService = DiscordMessageDmService.getInstance();
  private readonly _discordMessageTextService = DiscordMessageTextService.getInstance();
  private readonly _discordAuthorService = DiscordAuthorService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordMessageService`;

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._discordClientServiceClient.on(`message`, (message: Readonly<AnyDiscordMessage>): void => {
      this._handleMessage(message);
    });

    this._loggerService.debug(this._className, this._chalkService.text(`listen "message" event`));
  }

  private _handleMessage(message: Readonly<AnyDiscordMessage>): void {
    this._loggerService.log(this._className, this._loggerService.getSnowflakeContext(message.id, message.content), true);

    if (this._discordAuthorService.isValid(message.author)) {
      if (this._discordAuthorService.isBot(message.author)) {
        return;
      }
    }

    if (this._discordChannelService.isValid(message.channel)) {
      if (this._discordChannelService.isDm(message.channel)) {
        this._dmMessage(message);
      } else if (this._discordChannelService.isText(message.channel)) {
        this._textMessage(message);
      }
    }
  }

  private _dmMessage(message: Readonly<AnyDiscordMessage>): void {
    this._loggerService.debug(this._className, this._loggerService.getSnowflakeContext(message.id, `dm message`), true);

    const response: IDiscordMessageResponse | null = this._discordMessageDmService.getMessage(message);

    if (!_.isNil(response)) {
      this._sendMessage(message, response);
    }
  }

  private _textMessage(message: Readonly<AnyDiscordMessage>): void {
    this._loggerService.debug(this._className, this._loggerService.getSnowflakeContext(message.id, `text message`), true);

    const response: IDiscordMessageResponse | null = this._discordMessageTextService.getMessage(message);

    if (!_.isNil(response)) {
      this._sendMessage(message, response);
    }
  }

  private _sendMessage(
    message: Readonly<AnyDiscordMessage>,
    messageResponse: Readonly<IDiscordMessageResponse>
  ): void {
    this._loggerService.debug(this._className, this._loggerService.getSnowflakeContext(message.id, `sending message...`), true);

    if (!this._discordChannelService.isValid(message.channel)) {
      return;
    }

    message.channel.send(messageResponse.response, messageResponse.options).then((): void => {
      this._loggerService.log(this._className, this._loggerService.getSnowflakeContext(message.id, `message sent`), true);
    }).catch((error: unknown): void => {
      this._loggerService.error(this._className, this._loggerService.getSnowflakeContext(message.id, `message sending failed`), true);
      this._loggerService.error(this._className, this._loggerService.getSnowflakeContext(message.id, error), true);
    });
  }
}
