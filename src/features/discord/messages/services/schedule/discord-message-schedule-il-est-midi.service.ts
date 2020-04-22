import { Client, Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import moment from "moment";
import { Job, scheduleJob } from "node-schedule";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { getNoonScheduleRule } from "../../../../../functions/schedule/get-noon-schedule-rule";
import { ChalkService } from "../../../../logger/services/chalk.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { TimeService } from "../../../../time/services/time.service";
import { isDiscordGuildChannel } from "../../../channels/functions/is-discord-guild-channel";
import { DiscordChannelGuildService } from "../../../channels/services/discord-channel-guild.service";
import { AnyDiscordChannel } from "../../../channels/types/any-discord-channel";
import { DiscordGuildConfigService } from "../../../guilds/services/config/discord-guild-config.service";
import { DiscordClientService } from "../../../services/discord-client.service";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";

export class DiscordMessageScheduleIlEstMidiService extends AbstractService {
  private static _instance: DiscordMessageScheduleIlEstMidiService;

  public static getInstance(): DiscordMessageScheduleIlEstMidiService {
    if (_.isNil(DiscordMessageScheduleIlEstMidiService._instance)) {
      DiscordMessageScheduleIlEstMidiService._instance = new DiscordMessageScheduleIlEstMidiService();
    }

    return DiscordMessageScheduleIlEstMidiService._instance;
  }

  public readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _timeService: TimeService = TimeService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _rule: string = getNoonScheduleRule();
  private _job: Job | undefined = undefined;

  protected constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_IL_EST_MIDI_SERVICE);
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

    this._logNextJobDate();
  }

  private _executeJob(): void {
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`job triggered`),
    });

    this._handleMessages();
    this._logNextJobDate();
  }

  private _logNextJobDate(): void {
    const nextJobDateHumanized: string | null = this._getNextJobDateHumanized();
    const nextJobDate: string | null = this._getNextJobDate();

    if (!_.isNil(nextJobDateHumanized) && !_.isNil(nextJobDate)) {
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

  private _getNextJobDateHumanized(): string | null {
    if (!_.isNil(this._job)) {
      return this._timeService.fromNow(
        moment(this._job.nextInvocation().toISOString()).toISOString(),
        false
      );
    }

    return null;
  }

  private _getNextJobDate(): string | null {
    if (!_.isNil(this._job)) {
      return moment(this._job.nextInvocation().toISOString()).format(
        `HH:mm:ss`
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
    if (this._canSendMessage()) {
      this.discordClient.guilds.cache.forEach(
        (guild: Readonly<Guild>): void => {
          this._handleMessage(guild);
        }
      );
    }
  }

  private _canSendMessage(): boolean {
    if (this._discordGuildConfigService.shouldSendIlEstMidiMessage()) {
      return true;
    }

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`il est midi message sending disabled`),
    });

    return false;
  }

  private _handleMessage(guild: Readonly<Guild>): void {
    const primaryChannel: GuildChannel | null = this._discordChannelGuildService.getPrimary(
      guild
    );

    if (isDiscordGuildChannel(primaryChannel)) {
      this._sendMessage(primaryChannel);
    }
  }

  private _sendMessage(channel: Readonly<GuildChannel>): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse();

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`sending message for il est midi...`),
    });

    (channel as AnyDiscordChannel)
      .send(messageResponse.response, messageResponse.options)
      .then((): void => {
        this._loggerService.log({
          context: this._serviceName,
          message: this._chalkService.text(`il est midi message sent`),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.text(
            `il est midi message sending failed`
          ),
        });
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.error(error),
        });
      });
  }
}
