import _ from 'lodash';
import { chalkCyan } from '../logger/chalk';
import { Logger } from '../logger/logger';
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
  private _id: string;
  private _secretToken: string;

  public constructor(config?: Readonly<Partial<IDiscordConfig>>) {
    this._logger = Logger.getInstance();
    this._id = '';
    this._secretToken = '';

    this.updateId(config?.botId);
    this.updateSecretToken(config?.botSecretToken);
  }

  public getId(): string {
    return this._id;
  }

  public updateId(id?: Readonly<string>): void {
    if (_.isString(id)) {
      this._id = id;

      this._logger.log(this.constructor.name, `id updated to: ${chalkCyan(`"${id}"`)}`);
    }
  }

  public getSecretToken(): string {
    return this._secretToken;
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      this._secretToken = secretToken;

      this._logger.log(this.constructor.name, `secretToken updated to: ${chalkCyan(`"********"`)}`);
    }
  }
}
