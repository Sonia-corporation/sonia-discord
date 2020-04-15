import _ from "lodash";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";

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
    this.init();
  }

  public init(): void {
    this._listen();
  }

  private _listen(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._discordClientServiceClient.on(`ready`, (): void => {});

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`listen ${wrapInQuotes(`ready`)} event`),
    });
  }
}
