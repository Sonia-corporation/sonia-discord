import _ from 'lodash';
import { DiscordAuthentication } from './discord-authentication';
import { DiscordSonia } from './discord-sonia';
import { DiscordGuild } from './discord-guild';
import { IDiscordConfig } from './interfaces/discord-config';
import { DiscordMessage } from './discord-message';

export class Discord {
  private static _instance: Discord;

  public static getInstance(config?: Readonly<Partial<IDiscordConfig>>): Discord {
    if (_.isNil(Discord._instance)) {
      Discord._instance = new Discord(config);
    }

    return Discord._instance;
  }

  private static _bot(config?: Readonly<Partial<IDiscordConfig>>): void {
    DiscordSonia.getInstance(config);
  }

  private static _authenticate(): void {
    DiscordAuthentication.getInstance();
  }

  private static _handleGuilds(): void {
    DiscordGuild.getInstance();
  }

  private static _handleMessages(): void {
    DiscordMessage.getInstance();
  }

  private static _init(config?: Readonly<Partial<IDiscordConfig>>): void {
    Discord._bot(config);
    Discord._authenticate();
    Discord._handleGuilds();
    Discord._handleMessages();
  }

  public constructor(config?: Readonly<Partial<IDiscordConfig>>) {
    Discord._init(config);
  }
}
