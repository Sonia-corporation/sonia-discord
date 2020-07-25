import { Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { Job, scheduleJob } from "node-schedule";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { getEveryHourScheduleRule } from "../../../../../functions/schedule/get-every-hour-schedule-rule";
import { ChalkService } from "../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { getNextJobDate } from "../../../../schedules/functions/get-next-job-date";
import { getNextJobDateHumanized } from "../../../../schedules/functions/get-next-job-date-humanized";
import { TimezoneEnum } from "../../../../time/enums/timezone.enum";
import { isDiscordGuildChannel } from "../../../channels/functions/is-discord-guild-channel";
import { isDiscordGuildChannelWritable } from "../../../channels/functions/types/is-discord-guild-channel-writable";
import { DiscordChannelGuildService } from "../../../channels/services/discord-channel-guild.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildConfigService } from "../../../guilds/services/config/discord-guild-config.service";
import { DiscordGuildSoniaService } from "../../../guilds/services/discord-guild-sonia.service";
import { DiscordLoggerErrorService } from "../../../logger/services/discord-logger-error.service";
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

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  private readonly _discordLoggerErrorService: DiscordLoggerErrorService = DiscordLoggerErrorService.getInstance();
  private readonly _rule: string = getEveryHourScheduleRule();
  private _job: Job | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_IL_EST_MIDI_SERVICE);
  }

  public init(): void {
    this.startSchedule();
  }

  public startSchedule(): void {
    this._createSchedule();
  }

  public sendMessage(guild: Readonly<Guild>): void {
    const primaryChannel: GuildChannel | null = this._discordChannelGuildService.getPrimary(
      guild
    );

    if (isDiscordGuildChannel(primaryChannel)) {
      this._sendMessage(primaryChannel);
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

    this._handleMessages();
    this._logNextJobDate();
  }

  private _logNextJobDate(): void {
    if (!_.isNil(this._job)) {
      this._loggerService.logJobDate({
        context: this._serviceName,
        jobDate: getNextJobDate(this._job),
        jobDateHumanized: getNextJobDateHumanized(this._job),
        jobName: `next`,
      });
    }
  }

  private _getMessageResponse(): IDiscordMessageResponse {
    return {
      response: `Il est midi!`,
    };
  }

  private _handleMessages(): void {
    if (this._canSendMessage()) {
      this._discordClientService
        .getClient()
        .guilds.cache.forEach((guild: Readonly<Guild>): void => {
          this.sendMessage(guild);
        });
    }
  }

  private _canSendMessage(): boolean {
    if (this._discordGuildConfigService.shouldSendIlEstMidiMessage()) {
      if (this._isNoonInParis()) {
        return true;
      }

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`not noon in Paris`),
      });
    } else {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(
          `il est midi message sending disabled`
        ),
      });
    }

    return false;
  }

  private _isNoonInParis(): boolean {
    return _.isEqual(moment().tz(TimezoneEnum.PARIS).get(`hour`), 12);
  }

  private _sendMessage(guildChannel: Readonly<GuildChannel>): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse();

    if (isDiscordGuildChannelWritable(guildChannel)) {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`sending message for il est midi...`),
      });

      guildChannel
        .send(messageResponse.response, messageResponse.options)
        .then((): void => {
          this._loggerService.log({
            context: this._serviceName,
            message: this._chalkService.text(`il est midi message sent`),
          });
        })
        .catch((error: string): void => {
          this._onMessageError(error);
        });
    } else {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`the guild channel is not writable`),
      });
    }
  }

  private _onMessageError(error: string): void {
    this._messageErrorLog(error);
    this._sendMessageToSoniaDiscord(error);
  }

  private _messageErrorLog(error: string): void {
    this._loggerService.error({
      context: this._serviceName,
      message: this._chalkService.text(`il est midi message sending failed`),
    });
    this._loggerService.error({
      context: this._serviceName,
      message: this._chalkService.error(error),
    });
  }

  private _sendMessageToSoniaDiscord(error: string): void {
    this._discordGuildSoniaService.sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse: this._discordLoggerErrorService.getErrorMessageResponse(
        error
      ),
    });
  }
}
