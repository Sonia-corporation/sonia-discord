import _ from 'lodash';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { DiscordClientService } from '../discord-client-service';

export class DiscordLoggerService {
  private static _instance: DiscordLoggerService;

  public static getInstance(): DiscordLoggerService {
    if (_.isNil(DiscordLoggerService._instance)) {
      DiscordLoggerService._instance = new DiscordLoggerService();
    }

    return DiscordLoggerService._instance;
  }

  private readonly _discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordLoggerService`;

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listenForWarnings();
    this._listenForErrors();
  }

  private _listenForWarnings(): void {
    this._discordClientServiceClient.on(`warn`, (message: Readonly<string>): void => {
      this._handleWarn(message);
    });

    this._loggerService.debug(this._className, this._chalkService.text(`listen "warn" event`));
  }

  private _handleWarn(message: Readonly<string>): void {
    this._loggerService.warning(this._className, this._chalkService.text(message));
  }

  private _listenForErrors(): void {
    this._discordClientServiceClient.on(`error`, (message: Readonly<string>): void => {
      this._handleError(message);
    });

    this._loggerService.debug(this._className, this._chalkService.text(`listen "error" event`));
  }

  private _handleError(message: Readonly<string>): void {
    this._loggerService.error(this._className, this._chalkService.text(message));
  }
}
