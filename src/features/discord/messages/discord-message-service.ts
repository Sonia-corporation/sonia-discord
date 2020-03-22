import _ from 'lodash';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { DiscordChannelService } from '../channels/discord-channel-service';
import { DiscordClientService } from '../discord-client-service';
import { DiscordAuthorService } from '../users/discord-author-service';
import { DiscordMessageDmService } from './discord-message-dm-service';
import { DiscordMessageTextService } from './discord-message-text-service';
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
  private readonly _discordClientService = DiscordClientService.getInstance().getClient();
  private readonly _discordChannelService = DiscordChannelService.getInstance();
  private readonly _discordMessageDmService = DiscordMessageDmService.getInstance();
  private readonly _discordMessageTextService = DiscordMessageTextService.getInstance();
  private readonly _discordAuthorService = DiscordAuthorService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = 'DiscordMessageService';

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._discordClientService.on('message', (message: Readonly<AnyDiscordMessage>): void => {
      this._handleMessage(message);
    });

    this._loggerService.debug(this._className, this._chalkService.text(`listen messages`));
  }

  private _handleMessage(message: Readonly<AnyDiscordMessage>): void {
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
    const response: string | null = this._discordMessageDmService.getMessage(message);

    if (_.isString(response)) {
      this._sendMessage(message, response);
    }
  }

  private _textMessage(message: Readonly<AnyDiscordMessage>): void {
    const response: string | null = this._discordMessageTextService.getMessage(message);

    if (_.isString(response)) {
      this._sendMessage(message, response);
    }
  }

  private _sendMessage(
    message: Readonly<AnyDiscordMessage>,
    response: Readonly<string>
  ): void {
    this._loggerService.debug(this._className, this._chalkService.text(`sending message...`));

    if (!this._discordChannelService.isValid(message.channel)) {
      return;
    }

    message.channel.send(response).then((): void => {
      this._loggerService.log(this._className, this._chalkService.text(`message sent`));
    }).catch((error: unknown): void => {
      this._loggerService.error(this._className, this._chalkService.text(`message sending failed`));
      this._loggerService.error(this._className, this._chalkService.error(error));
    });
  }
}
