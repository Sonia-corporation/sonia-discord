import _ from 'lodash';
import { LoggerService } from '../../../logger/services/logger-service';
import { DiscordMentionService } from '../../mentions/services/discord-mention-service';
import { DiscordAuthorService } from '../../users/services/discord-author-service';
import { DiscordSoniaService } from '../../users/services/discord-sonia-service';
import { Sonia } from '../../users/types/sonia';
import { isDiscordMessage } from '../functions/is-discord-message';
import { IDiscordMessageResponse } from '../interfaces/discord-message-response';
import { AnyDiscordMessage } from '../types/any-discord-message';
import { DiscordMessage } from '../types/discord-message';
import { DiscordMessageAuthorService } from './discord-message-author-service';
import { DiscordMessageCommandService } from './discord-message-command-service';
import { DiscordMessageContentService } from './discord-message-content-service';

export class DiscordMessageTextService {
  private static _instance: DiscordMessageTextService;

  public static getInstance(): DiscordMessageTextService {
    if (_.isNil(DiscordMessageTextService._instance)) {
      DiscordMessageTextService._instance = new DiscordMessageTextService();
    }

    return DiscordMessageTextService._instance;
  }

  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordAuthorService = DiscordAuthorService.getInstance();
  private readonly _discordMentionService = DiscordMentionService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordMessageAuthorService = DiscordMessageAuthorService.getInstance();
  private readonly _discordMessageCommandService = DiscordMessageCommandService.getInstance();
  private readonly _discordMessageContentService = DiscordMessageContentService.getInstance();
  private readonly _className = `DiscordMessageTextService`;

  public getMessage(anyDiscordMessage: Readonly<AnyDiscordMessage>): IDiscordMessageResponse | null {
    if (this._discordAuthorService.isValid(anyDiscordMessage.author)) {
      if (this._discordMentionService.isValid(anyDiscordMessage.mentions)) {
        return this._getAnyDiscordMessageResponse(anyDiscordMessage);
      }
    }

    return null;
  }

  private _getAnyDiscordMessageResponse(anyDiscordMessage: Readonly<AnyDiscordMessage>): IDiscordMessageResponse | null {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(anyDiscordMessage.id, `message with valid mention`)
    });

    if (isDiscordMessage(anyDiscordMessage)) {
      return this._getDiscordMessageResponse(anyDiscordMessage);
    }

    return null;
  }

  private _getDiscordMessageResponse(discordMessage: Readonly<DiscordMessage>): IDiscordMessageResponse | null {
    if (this._discordMentionService.isForEveryone(discordMessage.mentions)) {
      return this._getEveryoneMentionMessageResponse(discordMessage);
    }

    const sonia: Sonia | null = this._discordSoniaService.getSonia();

    if (this._discordSoniaService.isValid(sonia)) {
      if (this._discordMentionService.isUserMentioned(discordMessage.mentions, sonia)) {
        return this._getSoniaMentionMessageResponse(discordMessage);
      }
    }

    return null;
  }

  private _getEveryoneMentionMessageResponse(discordMessage: Readonly<DiscordMessage>): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(discordMessage.id, `everyone mention`)
    });

    return {
      response: `Il est midi tout le monde !`
    };
  }

  private _getSoniaMentionMessageResponse(discordMessage: Readonly<DiscordMessage>): IDiscordMessageResponse | null {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(discordMessage.id, `sonia was mentioned`)
    });

    if (this._discordMessageContentService.hasContent(discordMessage.content)) {
      if (this._discordMessageCommandService.hasCommand(discordMessage.content)) {
        return this._discordMessageCommandService.handleCommands(discordMessage);
      }
    }

    return this._discordMessageAuthorService.reply(discordMessage);
  }
}
