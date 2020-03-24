import _ from 'lodash';
import { LoggerService } from '../../logger/logger-service';
import { DiscordMentionService } from '../mentions/discord-mention-service';
import { DiscordAuthorService } from '../users/discord-author-service';
import { DiscordSoniaService } from '../users/discord-sonia-service';
import { Sonia } from '../users/types/sonia';
import { DiscordMessageAuthorService } from './discord-message-author-service';
import { DiscordMessageCommandService } from './discord-message-command-service';
import { DiscordMessageContentService } from './discord-message-content-service';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';
import { AnyDiscordMessage } from './types/any-discord-message';

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

  public getMessage(message: Readonly<AnyDiscordMessage>): IDiscordMessageResponse | null {
    if (this._discordAuthorService.isValid(message.author)) {
      if (this._discordMentionService.isValid(message.mentions)) {
        this._loggerService.debug(this._className, this._loggerService.getSnowflakeContext(message.id, `message with valid mention`), true);

        if (this._discordMentionService.isForEveryone(message.mentions)) {
          return {
            response: `Il est midi tout le monde !`
          };
        }

        const sonia: Sonia | null = this._discordSoniaService.getSonia();

        if (this._discordSoniaService.isValid(sonia)) {
          if (this._discordMentionService.isUserMentioned(message.mentions, sonia)) {
            this._loggerService.debug(this._className, this._loggerService.getSnowflakeContext(message.id, `sonia was mentioned`), true);

            if (this._discordMessageContentService.hasContent(message.content)) {
              if (this._discordMessageCommandService.hasCommand(message.content)) {
                return this._discordMessageCommandService.handleCommands(message.content);
              }
            }

            return this._discordMessageAuthorService.reply(message);
          }
        }
      }
    }

    return null;
  }
}
