import _ from 'lodash';
import {
  chalkError,
  chalkText
} from '../../logger/chalk';
import { Logger } from '../../logger/logger';
import { DiscordChannel } from '../channels/discord-channel';
import { DiscordClient } from '../discord-client';
import { DiscordAuthor } from '../users/discord-author';
import { DiscordMessageDm } from './discord-message-dm';
import { DiscordMessageText } from './discord-message-text';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessage {
  private static _instance: DiscordMessage;

  public static getInstance(): DiscordMessage {
    if (_.isNil(DiscordMessage._instance)) {
      DiscordMessage._instance = new DiscordMessage();
    }

    return DiscordMessage._instance;
  }

  private readonly _logger = Logger.getInstance();
  private readonly _client = DiscordClient.getInstance().getClient();
  private readonly _discordChannel = DiscordChannel.getInstance();
  private readonly _discordMessageDm = DiscordMessageDm.getInstance();
  private readonly _discordMessageText = DiscordMessageText.getInstance();
  private readonly _discordAuthor = DiscordAuthor.getInstance();
  private readonly _className = 'DiscordMessage';

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._client.on('message', (message: Readonly<AnyDiscordMessage>): void => {
      this._handleMessage(message);
    });

    this._logger.debug(this._className, chalkText(`listen messages`));
  }

  private _handleMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (this._discordAuthor.isBotAuthor(message.author)) {
        return;
      }
    }

    if (!this._discordChannel.isValidChannel(message.channel)) {
      return;
    }

    if (this._discordChannel.isDmChannel(message.channel)) {
      this._dmMessage(message);
    } else if (this._discordChannel.isTextChannel(message.channel)) {
      this._textMessage(message);
    }
  }

  private _dmMessage(message: Readonly<AnyDiscordMessage>): void {
    const response: string | null = this._discordMessageDm.getDmMessage(message);

    if (_.isString(response)) {
      this._sendMessage(message, response);
    }
  }

  private _textMessage(message: Readonly<AnyDiscordMessage>): void {
    const response: string | null = this._discordMessageText.getTextMessage(message);

    if (_.isString(response)) {
      this._sendMessage(message, response);
    }
  }

  private _sendMessage(
    message: Readonly<AnyDiscordMessage>,
    response: Readonly<string>
  ): void {
    this._logger.debug(this._className, chalkText(`sending message...`));

    if (!this._discordChannel.isValidChannel(message.channel)) {
      return;
    }

    message.channel.send(response).then((): void => {
      this._logger.log(this._className, chalkText(`message sent`));
    }).catch((error: unknown): void => {
      this._logger.error(this._className, chalkText(`message sending failed`));
      this._logger.error(this._className, chalkError(error));
    });
  }
}
