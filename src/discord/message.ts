import { Client } from 'discord.js';
import _ from 'lodash';
import {
  chalkRed,
  chalkWhite
} from '../logger/chalk';
import { Logger } from '../logger/logger';
import { DiscordAuthor } from './author';
import { DiscordBot } from './bot';
import { DiscordChannel } from './channel';
import { DiscordClient } from './client';
import { DiscordMention } from './mention';
import { AnyDiscordMessage } from './types/any-discord-message';
import { Sonia } from './types/sonia';

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
  private readonly _discordBot: DiscordBot;
  private readonly _discordChannel: DiscordChannel;
  private readonly _discordAuthor: DiscordAuthor;
  private readonly _discordMention: DiscordMention;

  public constructor() {
    this._logger = Logger.getInstance();
    this._client = DiscordClient.getInstance().getClient();
    this._discordBot = DiscordBot.getInstance();
    this._discordChannel = DiscordChannel.getInstance();
    this._discordAuthor = DiscordAuthor.getInstance();
    this._discordMention = DiscordMention.getInstance();

    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._client.on('message', (message: Readonly<AnyDiscordMessage>): void => {
      this._handleMessage(message);
    });

    this._logger.debug(this.constructor.name, chalkWhite(`listen messages`));
  }

  private _handleMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordChannel.isValidChannel(message.channel)) {
      if (this._discordChannel.isDmChannel(message.channel)) {
        this._dmMessage(message);
      } else if (this._discordChannel.isTextChannel(message.channel)) {
        this._textMessage(message);
      }
    }
  }

  private _dmMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (!this._discordBot.isSonia(message.author.id)) {
        this._replyToAuthor(message);
      }
    }
  }

  private _textMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (!this._discordBot.isSonia(message.author.id)) {
        console.log(message);
        if (this._discordMention.isValidMessageMentions(message.mentions)) {
          if (this._discordMention.isMentionForEveryone(message.mentions)) {
            this._sendMessage(message, 'Il est midi tout le monde !');
          } else {
            const sonia: Sonia | null = this._discordBot.getSonia();

            if (this._discordBot.isSoniaValid(sonia)) {
              if (this._discordMention.isUserMentioned(message.mentions, sonia)) {
                this._replyToAuthor(message);
              }
            }
          }
        }
      }
    }
  }

  private _replyToAuthor(message: Readonly<AnyDiscordMessage>): void {
    let response = 'Il est midi !';

    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (this._discordAuthor.hasValidAuthorUsername(message.author)) {
        response = `Il est midi ${message.author.username} !`;
      }
    }

    this._sendMessage(message, response);
  }

  private _sendMessage(
    message: Readonly<AnyDiscordMessage>,
    response: Readonly<string>
  ): void {
    this._logger.debug(this.constructor.name, chalkWhite(`sending message...`));

    if (this._discordChannel.isValidChannel(message.channel)) {
      message.channel.send(response).then((): void => {
        this._logger.log(this.constructor.name, chalkWhite(`message sent`));
      }).catch((error: unknown): void => {
        this._logger.error(this.constructor.name, chalkWhite(`message sending failed`));
        this._logger.error(this.constructor.name, chalkRed(error));
      });
    }
  }
}
