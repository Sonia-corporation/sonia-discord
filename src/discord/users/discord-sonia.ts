import {
  chalkValue,
  chalkText
} from '../../logger/chalk';
import { Logger } from '../../logger/logger';
import { DiscordClient } from '../discord-client';
import { isDiscordClientUser } from './functions/is-discord-client-user';
import { IDiscordConfig } from '../interfaces/discord-config';
import { Sonia } from './types/sonia';
import _ from 'lodash';

export class DiscordSonia {
  private static _instance: DiscordSonia;

  public static getInstance(config?: Readonly<Partial<IDiscordConfig>>): DiscordSonia {
    if (_.isNil(DiscordSonia._instance)) {
      DiscordSonia._instance = new DiscordSonia(config);
    }

    return DiscordSonia._instance;
  }

  private readonly _logger = Logger.getInstance();
  private readonly _discordClient = DiscordClient.getInstance();
  private readonly _className = 'DiscordSonia';
  private _id: string;
  private _secretToken: string;

  public constructor(config?: Readonly<Partial<IDiscordConfig>>) {
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

      this._logger.log(this._className, chalkText(`id updated to: ${chalkValue(`"${id}"`)}`));
    }
  }

  public getSoniaSecretToken(): string {
    return this._secretToken;
  }

  public updateSoniaSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      this._secretToken = secretToken;

      this._logger.log(this._className, chalkText(`secretToken updated to: ${chalkValue(`"********"`)} (hidden)`));
    }
  }

  public isSonia(id: Readonly<string>): boolean {
    return _.isEqual(id, this.getSoniaId());
  }

  public getSonia(): Sonia | null {
    return this._discordClient.getClient().user;
  }

  public isSoniaValid(sonia: unknown): sonia is Sonia {
    return isDiscordClientUser(sonia);
  }
}
