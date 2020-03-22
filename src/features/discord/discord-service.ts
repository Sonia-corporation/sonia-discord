import _ from 'lodash';
import { DiscordAuthenticationService } from './authentications/discord-authentication-service';
import { DiscordGuildService } from './guilds/discord-guild-service';
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

  private static _bot(): void {
    DiscordSoniaService.getInstance();
  }

  private static _authenticate(): void {
    DiscordAuthenticationService.getInstance();
  }

  private static _handleGuilds(): void {
    DiscordGuildService.getInstance();
  }

  private static _handleMessages(): void {
    DiscordMessageService.getInstance();
  }

  private static _init(): void {
    DiscordService._bot();
    DiscordService._authenticate();
    DiscordService._handleGuilds();
    DiscordService._handleMessages();
  }

  public constructor() {
    DiscordService._init();
  }
}
