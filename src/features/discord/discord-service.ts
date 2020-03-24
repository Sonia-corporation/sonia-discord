import _ from 'lodash';
import { DiscordAuthenticationService } from './authentications/discord-authentication-service';
import { DiscordGuildMemberAddService } from './guilds/discord-guild-member-add-service';
import { DiscordGuildService } from './guilds/discord-guild-service';
import { DiscordLoggerService } from './logger/discord-logger-service';
import { DiscordMessageService } from './messages/discord-message-service';
import { DiscordSoniaService } from './users/discord-sonia-service';

export class DiscordService {
  private static _instance: DiscordService;

  public static getInstance(): DiscordService {
    if (_.isNil(DiscordService._instance)) {
      DiscordService._instance = new DiscordService();
    }

    return DiscordService._instance;
  }

  public constructor() {
    this._init();
  }

  private _init(): void {
    DiscordSoniaService.getInstance();
    DiscordLoggerService.getInstance();
    DiscordGuildService.getInstance();
    DiscordGuildMemberAddService.getInstance();
    DiscordMessageService.getInstance();
    DiscordAuthenticationService.getInstance();
  }
}
