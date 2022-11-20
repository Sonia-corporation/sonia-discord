import { AbstractService } from '../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { Client, Intents } from 'discord.js';
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
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.MESSAGE_CONTENT,
      ],
      partials: [`USER`, `CHANNEL`, `GUILD_MEMBER`, `MESSAGE`, `REACTION`, `GUILD_SCHEDULED_EVENT`],
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
