import discord, { Client } from 'discord.js';
import _ from 'lodash';
import { chalkText } from '../logger/chalk';
import { Logger } from '../logger/logger';

export class DiscordClient {
  private static _instance: DiscordClient;

  public static getInstance(): DiscordClient {
    if (_.isNil(DiscordClient._instance)) {
      DiscordClient._instance = new DiscordClient();
    }

    return DiscordClient._instance;
  }

  private readonly _logger: Logger;
  private readonly _client: Client;

  public constructor() {
    this._logger = Logger.getInstance();
    this._client = new discord.Client();

    this._logger.debug(this.constructor.name, chalkText(`client created`));
  }

  public getClient(): Client {
    return this._client;
  }
}

