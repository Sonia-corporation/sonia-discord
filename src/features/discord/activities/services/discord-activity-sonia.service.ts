import { ClientUser } from "discord.js";
import _ from "lodash";
import { filter, take } from "rxjs/operators";
import { AbstractService } from "../../../../classes/abstract.service";
import { IconEnum } from "../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";

export class DiscordActivitySoniaService extends AbstractService {
  private static _instance: DiscordActivitySoniaService;

  public static getInstance(): DiscordActivitySoniaService {
    if (_.isNil(DiscordActivitySoniaService._instance)) {
      DiscordActivitySoniaService._instance = new DiscordActivitySoniaService();
    }

    return DiscordActivitySoniaService._instance;
  }

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public setPresence(
    presenceActivity: Readonly<IDiscordPresenceActivity>
  ): void {
    const clientUser: ClientUser | null = this._discordClientService.getClient()
      .user;

    if (!_.isNil(clientUser)) {
      clientUser.setPresence({
        activity: presenceActivity,
        afk: false,
        status: `online`,
      });

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`Sonia presence updated`),
      });
    }
  }

  public setRandomPresence(): void {
    this.setPresence({
      name: `Spotify`,
      type: `LISTENING`,
      url: IconEnum.ARTIFICIAL_INTELLIGENCE,
    });
  }

  private _listen(): void {
    this._discordClientService
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean => {
          return _.isEqual(isReady, true);
        }),
        take(1)
      )
      .subscribe({
        next: (): void => {
          this.setRandomPresence();
        },
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });
  }
}
