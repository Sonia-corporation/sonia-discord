import _ from 'lodash';
import { PartialNested } from '../../../types/partial-nested';
import {
  chalkText,
  chalkValue
} from '../../logger/chalk';
import { LoggerService } from '../../logger/logger-service';
import { DiscordClientService } from '../discord-client-service';
import { IDiscordConfig } from '../interfaces/discord-config';
import { isDiscordClientUser } from './functions/is-discord-client-user';
import { Sonia } from './types/sonia';

export class DiscordSoniaService {
  private static _instance: DiscordSoniaService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordSoniaService {
    if (_.isNil(DiscordSoniaService._instance)) {
      DiscordSoniaService._instance = new DiscordSoniaService(config);
    }

    return DiscordSoniaService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordClientService = DiscordClientService.getInstance();
  private readonly _className = 'DiscordSoniaService';
  private _id = '';
  private _secretToken = '';

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
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

      this._loggerService.log(this._className, chalkText(`id updated to: ${chalkValue(`"${this._id}"`)}`));
    }
  }

  public getSecretToken(): string {
    return this._secretToken;
  }

  public updateSecretToken(secretToken?: Readonly<string>): void {
    if (_.isString(secretToken)) {
      this._secretToken = secretToken;

      this._loggerService.log(this._className, chalkText(`secretToken updated to: ${chalkValue(`"********"`)} (hidden)`));
    }
  }

  public isSonia(id: Readonly<string>): boolean {
    return _.isEqual(id, this.getId());
  }

  public getSonia(): Sonia | null {
    return this._discordClientService.getClient().user;
  }

  public isValid(sonia: unknown): sonia is Sonia {
    return isDiscordClientUser(sonia);
  }
}
