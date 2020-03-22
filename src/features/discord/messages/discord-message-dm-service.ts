import _ from 'lodash';
import { DiscordAuthorService } from '../users/discord-author-service';
import { DiscordSoniaService } from '../users/discord-sonia-service';
import { DiscordMessageAuthorService } from './discord-message-author-service';
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

  public getMessage(message: Readonly<AnyDiscordMessage>): string | null {
    if (this._discordAuthorService.isValid(message.author)) {
      if (!this._discordSoniaService.isSonia(message.author.id)) {
        return this._discordMessageAuthorService.reply(message);
      }
    }

    return null;
  }
}
