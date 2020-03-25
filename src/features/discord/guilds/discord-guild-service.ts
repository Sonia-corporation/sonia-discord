import _ from 'lodash';
import { wrapInQuotes } from '../../../functions/wrap-in-quotes';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { DiscordClientService } from '../discord-client-service';

export class DiscordGuildService {
  private static _instance: DiscordGuildService;

  public static getInstance(): DiscordGuildService {
    if (_.isNil(DiscordGuildService._instance)) {
      DiscordGuildService._instance = new DiscordGuildService();
    }

    return DiscordGuildService._instance;
  }

  private readonly _discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordGuildService`;

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._discordClientServiceClient.on(`ready`, (): void => {
    });

    this._loggerService.debug(this._className, this._chalkService.text(`listen ${wrapInQuotes(`ready`)} event`));
  }
}
