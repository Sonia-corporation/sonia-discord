import { DiscordAuthentication } from './authentications/discord-authentication';
import { DiscordGuild } from './guilds/discord-guild';
import { DiscordMessage } from './messages/discord-message';
import { DiscordSonia } from './users/discord-sonia';
import { IDiscordConfig } from './interfaces/discord-config';
import _ from 'lodash';

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

  private static _handleMessages(config?: Readonly<Partial<IDiscordConfig>>): void {
    DiscordMessage.getInstance(config);
  }

  private static _init(config?: Readonly<Partial<IDiscordConfig>>): void {
    Discord._bot(config);
    Discord._authenticate();
    Discord._handleGuilds();
    Discord._handleMessages(config);
  }

  public constructor(config?: Readonly<Partial<IDiscordConfig>>) {
    Discord._init(config);
  }
}
