import { Client } from "discord.js";
import _ from "lodash";
import { ChalkService } from "../../logger/services/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";

export class DiscordClientService {
  private static _instance: DiscordClientService;

  public static getInstance(): DiscordClientService {
    if (_.isNil(DiscordClientService._instance)) {
      DiscordClientService._instance = new DiscordClientService();
    }

    return DiscordClientService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _client = new Client();
  private readonly _className = `DiscordClientService`;

  public constructor() {
    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`client created`),
    });
  }

  public getClient(): Client {
    return this._client;
  }
}
