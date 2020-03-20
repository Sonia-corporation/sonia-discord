import { ClientUser } from 'discord.js';
import _ from 'lodash';
import { chalkCyan } from '../logger/chalk';
import { Logger } from '../logger/logger';
import { DiscordClient } from './client';
import { IDiscordConfig } from './interfaces/discord-config';

export class DiscordBot {
  private static _instance: DiscordBot;

  public static getInstance(config?: Readonly<Partial<IDiscordConfig>>): DiscordBot {
    if (_.isNil(DiscordBot._instance)) {
      DiscordBot._instance = new DiscordBot(config);
    }

    return DiscordBot._instance;
  }

  private readonly _logger: Logger;
  private readonly _discordClient: DiscordClient;
  private _id: string;
  private _secretToken: string;

  public constructor(config?: Readonly<Partial<IDiscordConfig>>) {
    this._logger = Logger.getInstance();
    this._discordClient = DiscordClient.getInstance();
    this._id = '';
    this._secretToken = '';

    this.updateSoniaId(config?.botId);
    this.updateSoniaSecretToken(config?.botSecretToken);
  }

  public getSoniaId(): string {
    return this._id;
  }

  public updateSoniaId(id?: Readonly<string>): void {
    if (_.isString(id)) {
      this._id = id;

      this._logger.log(this.constructor.name, `id updated to: ${chalkCyan(`"${id}"`)}`);
    }
  }

  public getSoniaSecretToken(): string {
    return this._secretToken;
  }

  public updateSoniaSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      this._secretToken = secretToken;

      this._logger.log(this.constructor.name, `secretToken updated to: ${chalkCyan(`"********"`)}`);
    }
  }

  public isSoniaBot(id: Readonly<string>): boolean {
    return _.isEqual(id, this.getSoniaId());
  }

  public getSonia(): ClientUser | null {
    return this._discordClient.getClient().user;
  }
}
