import { Client } from 'discord.js';
import _ from 'lodash';
import { Logger } from '../logger/logger';
import { DiscordClient } from './client';

export class DiscordGuild {
  private static _instance: DiscordGuild;

  public static getInstance(): DiscordGuild {
    if (_.isNil(DiscordGuild._instance)) {
      DiscordGuild._instance = new DiscordGuild();
    }

    return DiscordGuild._instance;
  }

  private readonly _logger: Logger;
  private readonly _client: Client;

  public constructor() {
    this._logger = Logger.getInstance();
    this._client = DiscordClient.getInstance().getClient();

    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._client.on('ready', (): void => {
    });
  }
}
