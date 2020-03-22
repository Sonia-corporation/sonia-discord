import _ from 'lodash';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { DiscordClientService } from '../discord-client-service';
import { DiscordSoniaConfigService } from '../users/discord-sonia-config-service';

export class DiscordAuthenticationService {
  private static _instance: DiscordAuthenticationService;

  public static getInstance(): DiscordAuthenticationService {
    if (_.isNil(DiscordAuthenticationService._instance)) {
      DiscordAuthenticationService._instance = new DiscordAuthenticationService();
    }

    return DiscordAuthenticationService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordClientService = DiscordClientService.getInstance().getClient();
  private readonly _discordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = 'DiscordAuthenticationService';

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
    this._login();
  }

  private _listen(): void {
    this._discordClientService.on('ready', (): void => {
      if (!_.isNil(this._discordClientService.user)) {
        this._loggerService.log(this._className, this._chalkService.text(`authenticated as: ${this._chalkService.value(`"${this._discordClientService.user.tag}`)}"`));
      } else {
        this._loggerService.log(this._className, this._chalkService.text(`authenticated as: ${this._chalkService.value(`unknown user`)}`));
      }
    });
  }

  private _login(): void {
    this._discordClientService.login(this._discordSoniaConfigService.getSecretToken()).then((): void => {
      this._loggerService.success(this._className, this._chalkService.text(`authentication successful`));
    }).catch((error: unknown): void => {
      this._loggerService.error(this._className, this._chalkService.text(`authentication failed`));
      this._loggerService.error(this._className, this._chalkService.error(error));
    });

    this._loggerService.debug(this._className, this._chalkService.text(`authenticating...`));
  }
}
