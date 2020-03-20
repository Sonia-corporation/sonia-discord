import {
  Client,
  Message,
  PartialMessage
} from 'discord.js';
import _ from 'lodash';
import {
  chalkRed,
  chalkWhite
} from '../logger/chalk';
import { Logger } from '../logger/logger';
import { DiscordBot } from './bot';
import { DiscordClient } from './client';

export class DiscordMessage {
  private static _instance: DiscordMessage;

  public static getInstance(): DiscordMessage {
    if (_.isNil(DiscordMessage._instance)) {
      DiscordMessage._instance = new DiscordMessage();
    }

    return DiscordMessage._instance;
  }

  private readonly _logger: Logger;
  private readonly _client: Client;
  private readonly _bot: DiscordBot;

  public constructor() {
    this._logger = Logger.getInstance();
    this._client = DiscordClient.getInstance().getClient();
    this._bot = DiscordBot.getInstance();

    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._client.on('message', (message: Readonly<Message | PartialMessage>): void => {
      this._handleMessage(message);
    });

    this._logger.debug(this.constructor.name, chalkWhite(`listen messages`));
  }

  private _handleMessage(message: Readonly<Message | PartialMessage>): void {
    if (!_.isNil(message.channel)) {
      if (_.isEqual(message.channel.type, 'dm')) {
        this._dmMessage(message);
      } else if (_.isEqual(message.channel.type, 'text')) {
        this._textMessage(message);
      }
    }
  }

  private _dmMessage(message: Readonly<Message | PartialMessage>): void {
    if (!_.isNil(message.author)) {
      if (!_.isEqual(message.author.id, this._bot.getId())) {
        this._sendMessage(message, 'Il est midi !');
      }
    }
  }

  private _textMessage(message: Readonly<Message | PartialMessage>): void {
    if (!_.isNil(message.author)) {
      if (!_.isEqual(message.author.id, this._bot.getId())) {
        this._sendMessage(message, 'Il est midi !');
      }
    }
  }

  private _sendMessage(
      message: Readonly<Message | PartialMessage>,
      responseMessage: Readonly<string>
  ): void {
    this._logger.debug(this.constructor.name, chalkWhite(`sending message...`));

    if (!_.isNil(message.channel)) {
      message.channel.send(responseMessage).then((): void => {
        this._logger.log(this.constructor.name, chalkWhite(`message sent`));
      }).catch((error: unknown): void => {
        this._logger.error(this.constructor.name, chalkWhite(`message sending failed`));
        this._logger.error(this.constructor.name, chalkRed(error));
      });
    }
  }
}
