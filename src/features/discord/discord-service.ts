import _ from 'lodash';
import { PartialNested } from '../../types/partial-nested';
import { DiscordAuthenticationService } from './authentications/discord-authentication-service';
import { DiscordGuildService } from './guilds/discord-guild-service';
import { IDiscordConfig } from './interfaces/discord-config';
import { DiscordMessageService } from './messages/discord-message-service';
import { DiscordSoniaService } from './users/discord-sonia-service';

export class DiscordService {
  private static _instance: DiscordService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordService {
    if (_.isNil(DiscordService._instance)) {
      DiscordService._instance = new DiscordService(config);
    }

    return DiscordService._instance;
  }

  private static _bot(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    DiscordSoniaService.getInstance(config);
  }

  private static _authenticate(): void {
    DiscordAuthenticationService.getInstance();
  }

  private static _handleGuilds(): void {
    DiscordGuildService.getInstance();
  }

  private static _handleMessages(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    DiscordMessageService.getInstance(config);
  }

  private static _init(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    DiscordService._bot(config);
    DiscordService._authenticate();
    DiscordService._handleGuilds();
    DiscordService._handleMessages(config);
  }

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    DiscordService._init(config);
  }
}
