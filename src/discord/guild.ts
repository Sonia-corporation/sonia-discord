import { Client } from 'discord.js';
import _ from 'lodash';
import { DiscordClient } from './client';

export class DiscordGuild {
  private static _instance: DiscordGuild;

  public static getInstance(): DiscordGuild {
    if (_.isNil(DiscordGuild._instance)) {
      DiscordGuild._instance = new DiscordGuild();
    }

    return DiscordGuild._instance;
  }

  private readonly _client: Client;

  public constructor() {
    this._client = DiscordClient.getInstance().getClient();

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
