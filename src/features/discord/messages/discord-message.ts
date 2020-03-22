import _ from 'lodash';
import { removeUndefined } from '../../../functions/remove-undefined';
import { PartialNested } from '../../../types/partial-nested';
import {
  chalkError,
  chalkText,
  chalkValue
} from '../../logger/chalk';
import { Logger } from '../../logger/logger';
import { DiscordChannel } from '../channels/discord-channel';
import { DiscordClient } from '../discord-client';
import { IDiscordCommandsConfig } from '../interfaces/discord-commands-config';
import { IDiscordConfig } from '../interfaces/discord-config';
import { DiscordAuthor } from '../users/discord-author';
import { DiscordMessageDm } from './discord-message-dm';
import { DiscordMessageText } from './discord-message-text';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessage {
  private static _instance: DiscordMessage;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordMessage {
    if (_.isNil(DiscordMessage._instance)) {
      DiscordMessage._instance = new DiscordMessage(config);
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
  private _commands: IDiscordCommandsConfig = {
    prefix: '!'
  };

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    if (!_.isNil(config)) {
      this.updateCommands(config.commands);

      this._logger.debug(this._className, chalkText(`configuration updated`));
    }

    this._init();
  }

  public getCommands(): IDiscordCommandsConfig {
    return this._commands;
  }

  public updateCommands(commands?: Readonly<PartialNested<IDiscordCommandsConfig>>): void {
    if (!_.isNil(commands)) {
      this.updateCommandsPrefix(commands.prefix);
    }
  }

  public updateCommandsPrefix(prefix?: string | (string | undefined)[]): void {
    if (_.isString(prefix)) {
      this._commands.prefix = prefix;

      this._logger.log(this._className, chalkText(`commands prefix updated to: ${chalkValue(`"${prefix}"`)}`));
    } else if (_.isArray(prefix)) {
      this._commands.prefix = removeUndefined(prefix);

      this._logger.log(this._className, chalkText(`commands prefix updated to: ${chalkValue(this._logger.getStringArray(this._commands.prefix))}`));
    }
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
    if (this._discordAuthor.isValid(message.author)) {
      if (this._discordAuthor.isBot(message.author)) {
        return;
      }
    }

    if (this._discordChannel.isValid(message.channel)) {
      if (this._discordChannel.isDm(message.channel)) {
        this._dmMessage(message);
      } else if (this._discordChannel.isText(message.channel)) {
        this._textMessage(message);
      }
    }
  }

  private _dmMessage(message: Readonly<AnyDiscordMessage>): void {
    const response: string | null = this._discordMessageDm.getMessage(message);

    if (_.isString(response)) {
      this._sendMessage(message, response);
    }
  }

  private _textMessage(message: Readonly<AnyDiscordMessage>): void {
    const response: string | null = this._discordMessageText.getMessage(message);

    if (_.isString(response)) {
      this._sendMessage(message, response);
    }
  }

  private _sendMessage(
    message: Readonly<AnyDiscordMessage>,
    response: Readonly<string>
  ): void {
    this._logger.debug(this._className, chalkText(`sending message...`));

    if (!this._discordChannel.isValid(message.channel)) {
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
