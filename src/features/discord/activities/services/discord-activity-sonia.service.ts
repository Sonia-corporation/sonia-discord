import { ClientUser, Presence } from "discord.js";
import _ from "lodash";
import { Job, scheduleJob } from "node-schedule";
import { filter, take } from "rxjs/operators";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { getEveryHourScheduleRule } from "../../../../functions/schedule/get-every-hour-schedule-rule";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { getNextJobDate } from "../../../schedules/functions/get-next-job-date";
import { getNextJobDateHumanized } from "../../../schedules/functions/get-next-job-date-humanized";
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
  private readonly _rule: string = getEveryHourScheduleRule();
  private _job: Job | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  // @todo add coverage
  public startSchedule(): void {
    this._createSchedule();
  }

  public setPresence(
    presenceActivity: Readonly<IDiscordPresenceActivity>
  ): Promise<Presence | void> {
    const clientUser: ClientUser | null = this._discordClientService.getClient()
      .user;

    if (!_.isNil(clientUser)) {
      return clientUser
        .setPresence({
          activity: presenceActivity,
          afk: false,
          status: `online`,
        })
        .then(
          (presence: Readonly<Presence>): Promise<Presence> => {
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

            return Promise.resolve(presence);
          }
        )
        .catch(
          (error: Readonly<Error | string>): Promise<void> => {
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

            return Promise.reject(error);
          }
        );
    }

    return Promise.reject(new Error(`Client user is not valid`));
  }

  public setRandomPresence(): void {
    const presenceActivity: IDiscordPresenceActivity | undefined = _.sample(
      DISCORD_PRESENCE_ACTIVITY
    );

    if (!_.isNil(presenceActivity)) {
      this.setPresence(presenceActivity);
    }
  }

  private _createSchedule(): void {
    this._job = scheduleJob(this._rule, (): void => {
      this._executeJob();
    });

    this._logNextJobDate();
  }

  private _executeJob(): void {
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`job triggered`),
    });

    this.setRandomPresence();
    this._logNextJobDate();
  }

  private _logNextJobDate(): void {
    if (!_.isNil(this._job)) {
      const nextJobDateHumanized: string | null = getNextJobDateHumanized(
        this._job
      );
      const nextJobDate: string | null = getNextJobDate(this._job);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(
          `next job: ${this._chalkService.value(
            nextJobDateHumanized
          )} ${this._chalkService.hint(`(${nextJobDate})`)}`
        ),
      });
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
          this.startSchedule();
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
