import _ from 'lodash';
import { DiscordClientService } from '../discord-client-service';

export class DiscordGuildService {
  private static _instance: DiscordGuildService;

  public static getInstance(): DiscordGuildService {
    if (_.isNil(DiscordGuildService._instance)) {
      DiscordGuildService._instance = new DiscordGuildService();
    }

    return DiscordGuildService._instance;
  }

  private readonly _discordClientService = DiscordClientService.getInstance().getClient();

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._discordClientService.on('ready', (): void => {
    });
  }
}
