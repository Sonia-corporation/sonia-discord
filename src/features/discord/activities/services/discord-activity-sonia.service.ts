import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { getEveryHourScheduleRule } from '../../../../functions/schedule/get-every-hour-schedule-rule';
import { getRandomRangeMinuteScheduleRule } from '../../../../functions/schedule/get-random-range-minute-schedule-rule';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { getNextJobDate } from '../../../schedules/functions/get-next-job-date';
import { getNextJobDateHumanized } from '../../../schedules/functions/get-next-job-date-humanized';
import { DiscordGuildSoniaChannelNameEnum } from '../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../guilds/services/discord-guild-sonia.service';
import { DiscordLoggerErrorService } from '../../logger/services/discord-logger-error.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { DISCORD_PRESENCE_ACTIVITY } from '../constants/discord-presence-activity';
import { IDiscordPresenceActivity } from '../interfaces/discord-presence-activity';
import { ClientUser, Presence } from 'discord.js';
import _ from 'lodash';
import { Job, scheduleJob } from 'node-schedule';
import { firstValueFrom, Observable } from 'rxjs';
import { filter, mergeMap, take, tap } from 'rxjs/operators';

const MINIMAL_RANGE_MINUTES = 5;
const MAXIMUM_RANGE_MINUTES = 15;

export class DiscordActivitySoniaService extends AbstractService {
  private static _instance: DiscordActivitySoniaService;

  public static getInstance(): DiscordActivitySoniaService {
    if (_.isNil(DiscordActivitySoniaService._instance)) {
      DiscordActivitySoniaService._instance = new DiscordActivitySoniaService();
    }

    return DiscordActivitySoniaService._instance;
  }

  private readonly _updaterRule: string = getEveryHourScheduleRule();
  private _rule: string = getRandomRangeMinuteScheduleRule(MINIMAL_RANGE_MINUTES, MAXIMUM_RANGE_MINUTES);
  private _updaterJob: Job | undefined = undefined;
  private _job: Job | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE);
  }

  public init(): Promise<Presence> {
    return firstValueFrom(this._listen$());
  }

  public startSchedule(): void {
    this._createUpdaterSchedule();
    this._createSchedule();
  }

  public setPresence(presenceActivity: Readonly<IDiscordPresenceActivity>): Promise<Presence> {
    const clientUser: ClientUser | null = DiscordClientService.getInstance().getClient().user;

    if (_.isNil(clientUser)) {
      return Promise.reject(new Error(`Client user is not valid`));
    }

    return clientUser
      .setPresence({
        activity: presenceActivity,
        afk: false,
        status: `online`,
      })
      .then((presence: Readonly<Presence>): Promise<Presence> => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `Sonia presence updated to: ${ChalkService.getInstance().value(
              _.head(presence.activities)?.type
            )} ${ChalkService.getInstance().text(`x`)} ${ChalkService.getInstance().value(
              _.head(presence.activities)?.name
            )}`
          ),
        });

        return Promise.resolve(presence);
      })
      .catch((error: Readonly<Error | string>): Promise<never> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`could not set the Sonia presence`),
        });
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().error(error),
        });
        DiscordGuildSoniaService.getInstance().sendMessageToChannel({
          channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
          messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(error),
        });

        return Promise.reject(error);
      });
  }

  public setRandomPresence(): Promise<Presence> {
    const presenceActivity: IDiscordPresenceActivity | undefined = _.sample(DISCORD_PRESENCE_ACTIVITY);

    if (_.isNil(presenceActivity)) {
      return Promise.reject(new Error(`No presence activity`));
    }

    return this.setPresence(presenceActivity);
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
      message: ChalkService.getInstance().text(`${jobName} rule: ${ChalkService.getInstance().value(rule)}`),
    });
  }

  private _executeUpdaterJob(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`updater job triggered`),
    });

    this._rule = getRandomRangeMinuteScheduleRule(MINIMAL_RANGE_MINUTES, MAXIMUM_RANGE_MINUTES);

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`job rule updated to: ${ChalkService.getInstance().value(this._rule)}`),
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

  private _executeJob(): Promise<Presence> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`job triggered`),
    });

    this._logNextJobDate();

    return this.setRandomPresence();
  }

  private _logNextUpdaterJobDate(): void {
    this._logJobDate(this._updaterJob, `next updater`);
  }

  private _logNextJobDate(): void {
    this._logJobDate(this._job, `next`);
  }

  private _logJobDate(job: Readonly<Job | undefined>, jobName: Readonly<string>): void {
    if (!_.isNil(job)) {
      LoggerService.getInstance().logJobDate({
        context: this._serviceName,
        jobDate: getNextJobDate(job),
        jobDateHumanized: getNextJobDateHumanized(job),
        jobName,
      });
    }
  }

  private _listen$(): Observable<Presence> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`ready`)} Discord client state`),
    });

    return DiscordClientService.getInstance()
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean => _.isEqual(isReady, true)),
        mergeMap((): Promise<Presence> => this.setRandomPresence()),
        take(ONE_EMITTER),
        tap({
          next: (): void => {
            this.startSchedule();
          },
        })
      );
  }
}
