import _ from "lodash";
import { Job, scheduleJob } from "node-schedule";
import { filter, take } from "rxjs/operators";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { getRandomValueFromEnum } from "../../../../functions/randoms/get-random-value-from-enum";
import { getEveryHourScheduleRule } from "../../../../functions/schedule/get-every-hour-schedule-rule";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { getNextJobDate } from "../../../schedules/functions/get-next-job-date";
import { getNextJobDateHumanized } from "../../../schedules/functions/get-next-job-date-humanized";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordSoniaEmotionalStateEnum } from "../enums/discord-sonia-emotional-state.enum";

export class DiscordSoniaEmotionalStateService extends AbstractService {
  private static _instance: DiscordSoniaEmotionalStateService;

  public static getInstance(): DiscordSoniaEmotionalStateService {
    if (_.isNil(DiscordSoniaEmotionalStateService._instance)) {
      DiscordSoniaEmotionalStateService._instance = new DiscordSoniaEmotionalStateService();
    }

    return DiscordSoniaEmotionalStateService._instance;
  }

  private readonly _rule: string = getEveryHourScheduleRule();
  private _job: Job | undefined = undefined;
  private _emotionalState: DiscordSoniaEmotionalStateEnum =
    DiscordSoniaEmotionalStateEnum.ANNOYED;

  public constructor() {
    super(ServiceNameEnum.DISCORD_SONIA_EMOTIONAL_STATE_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public startSchedule(): void {
    this._createSchedule();
  }

  public setEmotionalState(
    emotionalState: Readonly<DiscordSoniaEmotionalStateEnum>
  ): void {
    this._emotionalState = emotionalState;

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Sonia emotional state updated to: ${ChalkService.getInstance().value(
          this._emotionalState
        )}`
      ),
    });
  }

  public setRandomEmotionalState(): void {
    const emotionalState:
      | DiscordSoniaEmotionalStateEnum
      | undefined = this.getRandomEmotionalState();

    if (!_.isNil(emotionalState)) {
      this.setEmotionalState(emotionalState);
    }
  }

  public getEmotionalState(): DiscordSoniaEmotionalStateEnum {
    return this._emotionalState;
  }

  public getRandomEmotionalState(): DiscordSoniaEmotionalStateEnum | undefined {
    return getRandomValueFromEnum(DiscordSoniaEmotionalStateEnum);
  }

  private _createSchedule(): void {
    this._job = scheduleJob(this._rule, (): void => {
      this._executeJob();
    });

    this._logNextJobDate();
  }

  private _executeJob(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`job triggered`),
    });

    this.setRandomEmotionalState();
    this._logNextJobDate();
  }

  private _logNextJobDate(): void {
    if (!_.isNil(this._job)) {
      LoggerService.getInstance().logJobDate({
        context: this._serviceName,
        jobDate: getNextJobDate(this._job),
        jobDateHumanized: getNextJobDateHumanized(this._job),
        jobName: `next`,
      });
    }
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean =>
          _.isEqual(isReady, true)
        ),
        take(1)
      )
      .subscribe({
        next: (): void => {
          this.setRandomEmotionalState();
          this.startSchedule();
        },
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });
  }
}
