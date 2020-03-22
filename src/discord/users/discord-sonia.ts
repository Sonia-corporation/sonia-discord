import _ from 'lodash';
import {
  chalkText,
  chalkValue
} from '../../logger/chalk';
import { Logger } from '../../logger/logger';
import { DiscordClient } from '../discord-client';
import { IDiscordConfig } from '../interfaces/discord-config';
import { isDiscordClientUser } from './functions/is-discord-client-user';
import { Sonia } from './types/sonia';

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
  private _id = '';
  private _secretToken = '';

  public constructor(config?: Readonly<Partial<IDiscordConfig>>) {
    if (!_.isNil(config)) {
      this.updateId(config.botId);
      this.updateSecretToken(config.botSecretToken);
    }
  }

  public getId(): string {
    return this._id;
  }

  public updateId(id?: Readonly<string>): void {
    if (_.isString(id)) {
      this._id = id;

      this._logger.log(this._className, chalkText(`id updated to: ${chalkValue(`"${id}"`)}`));
    }
  }

  public getSecretToken(): string {
    return this._secretToken;
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      this._secretToken = secretToken;

      this._logger.log(this._className, chalkText(`secretToken updated to: ${chalkValue(`"********"`)} (hidden)`));
    }
  }

  public isSonia(id: Readonly<string>): boolean {
    return _.isEqual(id, this.getId());
  }

  public getSonia(): Sonia | null {
    return this._discordClient.getClient().user;
  }

  public isValid(sonia: unknown): sonia is Sonia {
    return isDiscordClientUser(sonia);
  }
}
