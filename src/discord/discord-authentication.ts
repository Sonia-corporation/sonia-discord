import _ from 'lodash';
import {
  chalkError,
  chalkText,
  chalkValue
} from '../logger/chalk';
import { Logger } from '../logger/logger';
import { DiscordClient } from './discord-client';
import { DiscordSonia } from './discord-sonia';

export class DiscordAuthentication {
  private static _instance: DiscordAuthentication;

  public static getInstance(): DiscordAuthentication {
    if (_.isNil(DiscordAuthentication._instance)) {
      DiscordAuthentication._instance = new DiscordAuthentication();
    }

    return DiscordAuthentication._instance;
  }

  private readonly _logger = Logger.getInstance();
  private readonly _client = DiscordClient.getInstance().getClient();
  private readonly _discordSonia = DiscordSonia.getInstance();
  private readonly _className = 'DiscordAuthentication';

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
    this._login();
  }

  private _listen(): void {
    this._client.on('ready', (): void => {
      if (!_.isNil(this._client.user)) {
        this._logger.log(this._className, chalkText(`authenticated as: ${chalkValue(`"${this._client.user.tag}`)}"`));
      } else {
        this._logger.log(this._className, chalkText(`authenticated as: ${chalkValue(`unknown user`)}`));
      }
    });
  }

  private _login(): void {
    this._client.login(this._discordSonia.getSoniaSecretToken()).then((): void => {
      this._logger.success(this._className, chalkText(`authentication successful`));
    }).catch((error: unknown): void => {
      this._logger.error(this._className, chalkText(`authentication failed`));
      this._logger.error(this._className, chalkError(error));
    });

    this._logger.debug(this._className, chalkText(`authenticating...`));
  }
}
