import { ClientUser, Presence } from "discord.js";
import _ from "lodash";
import { Job, scheduleJob } from "node-schedule";
import { Observable } from "rxjs";
import { filter, mergeMap, take, tap } from "rxjs/operators";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { getEveryHourScheduleRule } from "../../../../functions/schedule/get-every-hour-schedule-rule";
import { getRandomRangeMinuteScheduleRule } from "../../../../functions/schedule/get-random-range-minute-schedule-rule";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
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

  private readonly _updaterRule: string = getEveryHourScheduleRule();
  private _rule: string = getRandomRangeMinuteScheduleRule(5, 15);
  private _updaterJob: Job | undefined = undefined;
  private _job: Job | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE);
  }

  public async init(): Promise<Presence> {
    return await this._listen().toPromise();
  }

  public startSchedule(): void {
    this._createUpdaterSchedule();
    this._createSchedule();
  }

  public setPresence(
    presenceActivity: Readonly<IDiscordPresenceActivity>
  ): Promise<Presence> {
    const clientUser: ClientUser | null = DiscordClientService.getInstance().getClient()
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
            LoggerService.getInstance().debug({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `Sonia presence updated to: ${ChalkService.getInstance().value(
                  presence.activities[0].type
                )} ${ChalkService.getInstance().text(
                  `x`
                )} ${ChalkService.getInstance().value(
                  presence.activities[0].name
                )}`
              ),
            });

            return Promise.resolve(presence);
          }
        )
        .catch(
          (error: Readonly<Error | string>): Promise<never> => {
            LoggerService.getInstance().error({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `could not set the Sonia presence`
              ),
            });
            LoggerService.getInstance().error({
              context: this._serviceName,
              message: ChalkService.getInstance().error(error),
            });
            DiscordGuildSoniaService.getInstance().sendMessageToChannel({
              channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
              messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(
                error
              ),
            });

            return Promise.reject(error);
          }
        );
    }

    return Promise.reject(new Error(`Client user is not valid`));
  }

  public async setRandomPresence(): Promise<Presence> {
    const presenceActivity: IDiscordPresenceActivity | undefined = _.sample(
      DISCORD_PRESENCE_ACTIVITY
    );

    if (!_.isNil(presenceActivity)) {
      return await this.setPresence(presenceActivity);
    }

    return Promise.reject(new Error(`No presence activity`));
  }

  private _createUpdaterSchedule(): void {
    this._logJobRule(this._updaterRule, `updater job`);

    this._updaterJob = scheduleJob(this._updaterRule, (): void => {
      this._executeUpdaterJob();
    });

    this._logNextUpdaterJobDate();
  }

  private _createSchedule(): void {
    this._logJobRule(this._rule, `job`);

    this._job = scheduleJob(this._rule, (): void => {
      void this._executeJob();
    });

    this._logNextJobDate();
  }

  private _logJobRule(rule: Readonly<string>, jobName: Readonly<string>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `${jobName} rule: ${ChalkService.getInstance().value(rule)}`
      ),
    });
  }

  private _executeUpdaterJob(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`updater job triggered`),
    });

    this._rule = getRandomRangeMinuteScheduleRule(5, 15);

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `job rule updated to: ${ChalkService.getInstance().value(this._rule)}`
      ),
    });

    if (!_.isNil(this._job)) {
      this._job.reschedule(this._rule);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`job reschedule successfully`),
      });
    }

    this._logNextUpdaterJobDate();
  }

  private async _executeJob(): Promise<Presence> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`job triggered`),
    });

    this._logNextJobDate();
    return await this.setRandomPresence();
  }

  private _logNextUpdaterJobDate(): void {
    this._logJobDate(this._updaterJob, `next updater`);
  }

  private _logNextJobDate(): void {
    this._logJobDate(this._job, `next`);
  }

  private _logJobDate(
    job: Readonly<Job | undefined>,
    jobName: Readonly<string>
  ): void {
    if (!_.isNil(job)) {
      LoggerService.getInstance().logJobDate({
        context: this._serviceName,
        jobDate: getNextJobDate(job),
        jobDateHumanized: getNextJobDateHumanized(job),
        jobName,
      });
    }
  }

  private _listen(): Observable<Presence> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });

    return DiscordClientService.getInstance()
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean =>
          _.isEqual(isReady, true)
        ),
        mergeMap((): Promise<Presence> => this.setRandomPresence()),
        take(1),
        tap({
          next: (): void => {
            this.startSchedule();
          },
        })
      );
  }
}
