import _ from 'lodash';
import { DiscordAuthorService } from '../users/discord-author-service';
import { DiscordSoniaService } from '../users/discord-sonia-service';
import { DiscordMessageAuthorService } from './discord-message-author-service';
import { DiscordMessageCommandService } from './discord-message-command-service';
import { DiscordMessageContentService } from './discord-message-content-service';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessageDmService {
  private static _instance: DiscordMessageDmService;

  public static getInstance(): DiscordMessageDmService {
    if (_.isNil(DiscordMessageDmService._instance)) {
      DiscordMessageDmService._instance = new DiscordMessageDmService();
    }

    return DiscordMessageDmService._instance;
  }

  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordAuthorService = DiscordAuthorService.getInstance();
  private readonly _discordMessageAuthorService = DiscordMessageAuthorService.getInstance();
  private readonly _discordMessageContentService = DiscordMessageContentService.getInstance();
  private readonly _discordMessageCommandService = DiscordMessageCommandService.getInstance();

  public getMessage(message: Readonly<AnyDiscordMessage>): IDiscordMessageResponse | null {
    if (this._discordAuthorService.isValid(message.author)) {
      if (!this._discordSoniaService.isSonia(message.author.id)) {
        if (this._discordMessageContentService.hasContent(message.content)) {
          if (this._discordMessageCommandService.hasCommand(message.content)) {
            return this._discordMessageCommandService.handleCommands(message.content);
          }
        }

        return this._discordMessageAuthorService.reply(message);
      }
    }

    return null;
  }
}
