import { DiscordClient } from '../discord-client';
import _ from 'lodash';

export class DiscordGuild {
  private static _instance: DiscordGuild;

  public static getInstance(): DiscordGuild {
    if (_.isNil(DiscordGuild._instance)) {
      DiscordGuild._instance = new DiscordGuild();
    }

    return DiscordGuild._instance;
  }

  private readonly _client = DiscordClient.getInstance().getClient();

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._client.on('ready', (): void => {
    });
  }
}
