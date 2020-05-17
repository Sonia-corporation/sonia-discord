import { ClientUser, Presence } from "discord.js";
import _ from "lodash";
import { filter, take } from "rxjs/operators";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildSoniaService } from "../../guilds/services/discord-guild-sonia.service";
import { DiscordLoggerErrorService } from "../../logger/services/discord-logger-error.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DISCORD_PRESENCE_ACTIVITY } from "../constants/discord-presence-activity";
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
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  private readonly _discordLoggerErrorService: DiscordLoggerErrorService = DiscordLoggerErrorService.getInstance();

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
      clientUser
        .setPresence({
          activity: presenceActivity,
          afk: false,
          status: `online`,
        })
        .then((presence: Readonly<Presence>): void => {
          this._loggerService.debug({
            context: this._serviceName,
            message: this._chalkService.text(
              `Sonia presence updated to: ${this._chalkService.value(
                presence.activities[0].type
              )} ${this._chalkService.text(`x`)} ${this._chalkService.value(
                presence.activities[0].name
              )}`
            ),
          });
        })
        .catch((error: Readonly<Error | string>): void => {
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(
              `could not set the Sonia presence`
            ),
          });
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.error(error),
          });
          this._discordGuildSoniaService.sendMessageToChannel({
            channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
            messageResponse: this._discordLoggerErrorService.getErrorMessageResponse(
              error
            ),
          });
        });
    }
  }

  public setRandomPresence(): void {
    const presenceActivity: IDiscordPresenceActivity | undefined = _.sample(
      DISCORD_PRESENCE_ACTIVITY
    );

    if (!_.isNil(presenceActivity)) {
      this.setPresence(presenceActivity);
    }
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
