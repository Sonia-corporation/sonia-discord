import { chalkText } from '../logger/chalk';
import { Logger } from '../logger/logger';
import { Client } from 'src/features/discord/discord.js';
import _ from 'lodash';

export class DiscordClient {
  private static _instance: DiscordClient;

  public static getInstance(): DiscordClient {
    if (_.isNil(DiscordClient._instance)) {
      DiscordClient._instance = new DiscordClient();
    }

    return DiscordClient._instance;
  }

  private readonly _logger = Logger.getInstance();
  private readonly _client = new Client();
  private readonly _className = 'DiscordClient';

  public constructor() {
    this._logger.debug(this._className, chalkText(`client created`));
  }

  public getClient(): Client {
    return this._client;
  }
}

