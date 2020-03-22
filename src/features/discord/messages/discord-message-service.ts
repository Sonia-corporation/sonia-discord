import _ from 'lodash';
import { removeUndefined } from '../../../functions/remove-undefined';
import { PartialNested } from '../../../types/partial-nested';
import {
  chalkError,
  chalkText,
  chalkValue
} from '../../logger/chalk';
import { LoggerService } from '../../logger/logger-service';
import { DiscordChannelService } from '../channels/discord-channel-service';
import { DiscordClientService } from '../discord-client-service';
import { IDiscordCommandsConfig } from '../interfaces/discord-commands-config';
import { IDiscordConfig } from '../interfaces/discord-config';
import { DiscordAuthorService } from '../users/discord-author-service';
import { DiscordMessageDmService } from './discord-message-dm-service';
import { DiscordMessageTextService } from './discord-message-text-service';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessageService {
  private static _instance: DiscordMessageService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordMessageService {
    if (_.isNil(DiscordMessageService._instance)) {
      DiscordMessageService._instance = new DiscordMessageService(config);
    }

    return DiscordMessageService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordClientService = DiscordClientService.getInstance().getClient();
  private readonly _discordChannelService = DiscordChannelService.getInstance();
  private readonly _discordMessageDmService = DiscordMessageDmService.getInstance();
  private readonly _discordMessageTextService = DiscordMessageTextService.getInstance();
  private readonly _discordAuthorService = DiscordAuthorService.getInstance();
  private readonly _className = 'DiscordMessageService';
  private readonly _commands: IDiscordCommandsConfig = {
    prefix: '!'
  };

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    if (!_.isNil(config)) {
      this.updateCommands(config.commands);

      this._loggerService.debug(this._className, chalkText(`configuration updated`));
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

      this._loggerService.log(this._className, chalkText(`commands prefix updated to: ${chalkValue(`"${prefix}"`)}`));
    } else if (_.isArray(prefix)) {
      this._commands.prefix = removeUndefined(prefix);

      this._loggerService.log(this._className, chalkText(`commands prefix updated to: ${chalkValue(this._loggerService.getStringArray(this._commands.prefix))}`));
    }
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._discordClientService.on('message', (message: Readonly<AnyDiscordMessage>): void => {
      this._handleMessage(message);
    });

    this._loggerService.debug(this._className, chalkText(`listen messages`));
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
    this._loggerService.debug(this._className, chalkText(`sending message...`));

    if (!this._discordChannelService.isValid(message.channel)) {
      return;
    }

    message.channel.send(response).then((): void => {
      this._loggerService.log(this._className, chalkText(`message sent`));
    }).catch((error: unknown): void => {
      this._loggerService.error(this._className, chalkText(`message sending failed`));
      this._loggerService.error(this._className, chalkError(error));
    });
  }
}
