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
import { DiscordClientService } from '../../services/discord-client.service';
import { DISCORD_EMOTIONAL_STATE_MESSAGES } from '../constants/discord-emotional-state-messages';
import { DiscordSoniaEmotionalStateEnum } from '../enums/discord-sonia-emotional-state.enum';
import _ from 'lodash';
import { Job, scheduleJob } from 'node-schedule';
import { firstValueFrom, Observable } from 'rxjs';
import { filter, mergeMap, take, tap } from 'rxjs/operators';

const MINIMAL_RANGE_MINUTES = 5;
const MAXIMUM_RANGE_MINUTES = 30;

export class DiscordSoniaEmotionalStateService extends AbstractService {
  private static _instance: DiscordSoniaEmotionalStateService;

  public static getInstance(): DiscordSoniaEmotionalStateService {
    if (_.isNil(DiscordSoniaEmotionalStateService._instance)) {
      DiscordSoniaEmotionalStateService._instance = new DiscordSoniaEmotionalStateService();
    }

    return DiscordSoniaEmotionalStateService._instance;
  }

  private readonly _updaterRule: string = getEveryHourScheduleRule();
  private _rule: string = getRandomRangeMinuteScheduleRule(MINIMAL_RANGE_MINUTES, MAXIMUM_RANGE_MINUTES);
  private _job: Job | undefined = undefined;
  private _updaterJob: Job | undefined = undefined;
  private _emotionalState: DiscordSoniaEmotionalStateEnum = DiscordSoniaEmotionalStateEnum.ANNOYED;

  public constructor() {
    super(ServiceNameEnum.DISCORD_SONIA_EMOTIONAL_STATE_SERVICE);
  }

  public init(): Promise<DiscordSoniaEmotionalStateEnum> {
    return firstValueFrom(this._listen$());
  }

  public startSchedule(): void {
    this._createUpdaterSchedule();
    this._createSchedule();
  }

  public setEmotionalState(emotionalState: Readonly<DiscordSoniaEmotionalStateEnum>): void {
    this._emotionalState = emotionalState;

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Sonia emotional state updated to: ${ChalkService.getInstance().value(this._emotionalState)}`
      ),
    });
  }

  public setRandomEmotionalState(): Promise<DiscordSoniaEmotionalStateEnum> {
    const emotionalState: DiscordSoniaEmotionalStateEnum = this.getRandomEmotionalState();

    this.setEmotionalState(emotionalState);

    return Promise.resolve(emotionalState);
  }

  public getEmotionalState(): DiscordSoniaEmotionalStateEnum {
    return this._emotionalState;
  }

  public getRandomEmotionalState(): DiscordSoniaEmotionalStateEnum {
    return DISCORD_EMOTIONAL_STATE_MESSAGES.getRandomMessage();
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

  private _executeJob(): Promise<DiscordSoniaEmotionalStateEnum> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`job triggered`),
    });

    this._logNextJobDate();

    return this.setRandomEmotionalState();
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

  private _listen$(): Observable<DiscordSoniaEmotionalStateEnum> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`ready`)} Discord client state`),
    });

    return DiscordClientService.getInstance()
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean => _.isEqual(isReady, true)),
        mergeMap((): Promise<DiscordSoniaEmotionalStateEnum> => this.setRandomEmotionalState()),
        take(ONE_EMITTER),
        tap({
          next: (): void => {
            this.startSchedule();
          },
        })
      );
  }
}
