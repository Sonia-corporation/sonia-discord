import { AbstractService } from '../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import _ from 'lodash';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export class DiscordClientService extends AbstractService {
  private static _instance: DiscordClientService;

  public static getInstance(): DiscordClientService {
    if (_.isNil(DiscordClientService._instance)) {
      DiscordClientService._instance = new DiscordClientService();
    }

    return DiscordClientService._instance;
  }

  private _client: Client | undefined = undefined;
  private readonly _isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor() {
    super(ServiceNameEnum.DISCORD_CLIENT_SERVICE);
  }

  public createClient(): Client {
    this._client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
      ],
    });

    return this._client;
  }

  public getClient(): Client {
    if (_.isNil(this._client)) {
      return this.createClient();
    }

    return this._client;
  }

  public isReady$(): Observable<boolean> {
    return this._isReady$.asObservable();
  }

  public isReady(): Promise<true> {
    return firstValueFrom(
      this.isReady$().pipe(
        filter((isReady: boolean): boolean => _.isEqual(isReady, true)),
        take(ONE_EMITTER),
        map((): true => true)
      )
    );
  }

  public notifyIsReady(): void {
    this._isReady$.next(true);
  }
}
