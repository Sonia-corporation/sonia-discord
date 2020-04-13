import { Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import moment from "moment";
import { Job, scheduleJob } from "node-schedule";
import { getEveryHourScheduleRule } from "../../../../../functions/schedule/get-every-hour-schedule-rule";
import { ChalkService } from "../../../../logger/services/chalk-service";
import { LoggerService } from "../../../../logger/services/logger-service";
import { TimeService } from "../../../../time/services/time-service";
import { isDiscordGuildChannel } from "../../../channels/functions/is-discord-guild-channel";
import { DiscordChannelGuildService } from "../../../channels/services/discord-channel-guild-service";
import { AnyDiscordChannel } from "../../../channels/types/any-discord-channel";
import { isDiscordGuild } from "../../../guilds/functions/is-discord-guild";
import { DiscordClientService } from "../../../services/discord-client-service";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";

export class DiscordMessageScheduleIlEstMidiService {
  private static _instance: DiscordMessageScheduleIlEstMidiService;

  public static getInstance(): DiscordMessageScheduleIlEstMidiService {
    if (_.isNil(DiscordMessageScheduleIlEstMidiService._instance)) {
      DiscordMessageScheduleIlEstMidiService._instance = new DiscordMessageScheduleIlEstMidiService();
    }

    return DiscordMessageScheduleIlEstMidiService._instance;
  }

  public readonly discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _timeService: TimeService = TimeService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _className = `DiscordMessageScheduleIlEstMidiService`;
  private readonly _rule: string = getEveryHourScheduleRule();
  private _job: Job | undefined = undefined;

  public constructor() {
    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`created`),
    });

    this.init();
  }

  public init(): void {
    this._startSchedule();
  }

  private _startSchedule(): void {
    this._createSchedule();
  }

  private _createSchedule(): void {
    this._job = scheduleJob(this._rule, (): void => {
      this._executeJob();
    });
  }

  private _executeJob(): void {
    this._loggerService.debug({
      context: this._className,
      message: `job triggered`,
    });

    this._handleMessages();
    this._logNextJob();
  }

  private _logNextJob(): void {
    const nextJobDate: string | null = this._getNextJobDate();

    if (!_.isNil(nextJobDate)) {
      this._loggerService.debug({
        context: this._className,
        message: `next job: ${nextJobDate}`,
      });
    }
  }

  private _getNextJobDate(): string | null {
    if (!_.isNil(this._job)) {
      return this._timeService.fromNow(
        moment(this._job.nextInvocation().toISOString()).toISOString(),
        false
      );
    }

    return null;
  }

  private _getMessageResponse(): IDiscordMessageResponse {
    return {
      response: `Il est midi !`,
    };
  }

  private _handleMessages(): void {
    this.discordClientServiceClient.guilds.cache.forEach(
      (guild: Readonly<Guild>): void => {
        this._handleMessage(guild);
      }
    );
  }

  private _handleMessage(guild: Readonly<Guild>): void {
    const primaryChannel: GuildChannel | null = this._getPrimaryChannel(guild);

    if (isDiscordGuildChannel(primaryChannel)) {
      this._sendMessage(primaryChannel);
    }
  }

  private _sendMessage(channel: Readonly<GuildChannel>): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse();

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`sending message for il est midi...`),
    });

    (channel as AnyDiscordChannel)
      .send(messageResponse.response, messageResponse.options)
      .then((): void => {
        this._loggerService.log({
          context: this._className,
          message: this._chalkService.text(`il est midi message sent`),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._className,
          message: this._chalkService.text(
            `il est midi message sending failed`
          ),
        });
        this._loggerService.error({
          context: this._className,
          message: this._chalkService.error(error),
        });
      });
  }

  private _getPrimaryChannel(guild: Readonly<Guild>): GuildChannel | null {
    if (isDiscordGuild(guild)) {
      const primaryChannel:
        | GuildChannel
        | undefined = guild.channels.cache.find(
        (channel: Readonly<GuildChannel>): boolean => {
          return this._discordChannelGuildService.isGeneral(channel);
        }
      );

      if (isDiscordGuildChannel(primaryChannel)) {
        return primaryChannel;
      }
    }

    return null;
  }
}
