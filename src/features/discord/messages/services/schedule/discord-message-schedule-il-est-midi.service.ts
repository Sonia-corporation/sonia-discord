import { Guild, GuildChannel, Message } from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { Job, scheduleJob } from "node-schedule";
import { AbstractService } from "../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { getEveryHourScheduleRule } from "../../../../../functions/schedule/get-every-hour-schedule-rule";
import { isUpToDateFirebaseGuild } from "../../../../firebase/functions/guilds/is-up-to-date-firebase-guild";
import { FirebaseGuildsChannelsFeaturesService } from "../../../../firebase/services/guilds/channels/features/firebase-guilds-channels-features.service";
import { FirebaseGuildsChannelsFeaturesNoonService } from "../../../../firebase/services/guilds/channels/features/noon/firebase-guilds-channels-features-noon.service";
import { FirebaseGuildsChannelsService } from "../../../../firebase/services/guilds/channels/firebase-guilds-channels.service";
import { FirebaseGuildsService } from "../../../../firebase/services/guilds/firebase-guilds.service";
import { IFirebaseGuildChannel } from "../../../../firebase/types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuild } from "../../../../firebase/types/guilds/firebase-guild";
import { IFirebaseGuildVFinal } from "../../../../firebase/types/guilds/firebase-guild-v-final";
import { ChalkService } from "../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { getNextJobDate } from "../../../../schedules/functions/get-next-job-date";
import { getNextJobDateHumanized } from "../../../../schedules/functions/get-next-job-date-humanized";
import { TimezoneEnum } from "../../../../time/enums/timezone.enum";
import { isDiscordGuildChannelWritable } from "../../../channels/functions/types/is-discord-guild-channel-writable";
import { IAnyDiscordChannel } from "../../../channels/types/any-discord-channel";
import { DiscordGuildSoniaChannelNameEnum } from "../../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildConfigService } from "../../../guilds/services/config/discord-guild-config.service";
import { DiscordGuildSoniaService } from "../../../guilds/services/discord-guild-sonia.service";
import { DiscordLoggerErrorService } from "../../../logger/services/discord-logger-error.service";
import { DiscordClientService } from "../../../services/discord-client.service";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";

const NOON_HOUR = 12;

export class DiscordMessageScheduleIlEstMidiService extends AbstractService {
  private static _instance: DiscordMessageScheduleIlEstMidiService;

  public static getInstance(): DiscordMessageScheduleIlEstMidiService {
    if (_.isNil(DiscordMessageScheduleIlEstMidiService._instance)) {
      DiscordMessageScheduleIlEstMidiService._instance = new DiscordMessageScheduleIlEstMidiService();
    }

    return DiscordMessageScheduleIlEstMidiService._instance;
  }

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

  public sendMessage(
    guild: Readonly<Guild>
  ): Promise<(Message | void)[] | void> {
    return FirebaseGuildsService.getInstance()
      .getGuild(guild.id)
      .then(
        (
          firebaseGuild: Readonly<IFirebaseGuild | null | undefined>
        ): Promise<(Message | void)[]> => {
          if (this._isValidGuild(firebaseGuild)) {
            return Promise.all(
              _.map(
                firebaseGuild.channels,
                (
                  channel: Readonly<IFirebaseGuildChannel>
                ): Promise<Message | void> =>
                  this.sendMessageByChannel(channel, firebaseGuild, guild)
              )
            );
          }

          return Promise.reject(new Error(`Invalid guild`));
        }
      );
  }

  public sendMessageByChannel(
    channel: Readonly<IFirebaseGuildChannel>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    guild: Readonly<Guild>
  ): Promise<Message | void> {
    const isNoonEnabled: boolean = this._isNoonEnabled(channel, firebaseGuild);

    if (_.isEqual(isNoonEnabled, true)) {
      if (!_.isNil(channel.id)) {
        const guildChannel: GuildChannel | undefined = guild.channels.cache.get(
          channel.id
        );

        if (!_.isNil(guildChannel)) {
          return this._sendMessage(guildChannel);
        }

        return Promise.reject(new Error(`Guild channel not found`));
      }

      return Promise.reject(new Error(`Channel id not found`));
    }

    return Promise.reject(new Error(`Noon state disabled`));
  }

  public handleMessages(): void {
    if (this._canSendMessage()) {
      DiscordClientService.getInstance()
        .getClient()
        .guilds.cache.forEach((guild: Readonly<Guild>): void => {
          void this.sendMessage(guild);
        });
    }
  }

  private _isNoonEnabled(
    channel: Readonly<IFirebaseGuildChannel>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    const channelId: string | undefined = channel.id;

    if (!_.isNil(channelId) && this._isValidChannel(channelId, firebaseGuild)) {
      if (this._isValidFeature(channelId, firebaseGuild)) {
        if (this._isValidNoonFeature(channelId, firebaseGuild)) {
          return (
            firebaseGuild.channels?.[channelId].features?.noon?.isEnabled ??
            false
          );
        }
      }
    }

    return false;
  }

  private _isValidChannel(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId]
    );
  }

  private _isValidFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsFeaturesService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features
    );
  }

  private _isValidNoonFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsFeaturesNoonService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features?.noon
    );
  }

  private _isValidGuild(
    firebaseGuild: Readonly<IFirebaseGuild | null | undefined>
  ): firebaseGuild is IFirebaseGuildVFinal {
    return !_.isNil(firebaseGuild) && isUpToDateFirebaseGuild(firebaseGuild);
  }

  private _createSchedule(): void {
    this._logJobRule(this._rule, `job`);

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

    this.handleMessages();
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

  private _getMessageResponse(): IDiscordMessageResponse {
    return {
      options: {
        split: false,
      },
      response: `Il est midi!`,
    };
  }

  private _canSendMessage(): boolean {
    if (DiscordGuildConfigService.getInstance().shouldSendIlEstMidiMessage()) {
      if (this._isNoonInParis()) {
        return true;
      }

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`not noon in Paris`),
      });
    } else {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `il est midi message sending disabled`
        ),
      });
    }

    return false;
  }

  private _isNoonInParis(): boolean {
    return _.isEqual(moment().tz(TimezoneEnum.PARIS).get(`hour`), NOON_HOUR);
  }

  private _sendMessage(
    guildChannel: Readonly<GuildChannel>
  ): Promise<Message | void> {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse();

    if (isDiscordGuildChannelWritable(guildChannel)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `sending message for il est midi...`
        ),
      });

      return guildChannel
        .send(messageResponse.response, messageResponse.options)
        .then((): void => {
          LoggerService.getInstance().log({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `il est midi message sent`
            ),
          });
        })
        .catch((error: Readonly<string>): void => {
          this._onMessageError(error);
        });
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `the guild channel is not writable`
      ),
    });

    return Promise.reject(new Error(`Guild channel not writable`));
  }

  private _onMessageError(error: Readonly<string>): void {
    this._messageErrorLog(error);
    this._sendMessageToSoniaDiscord(error);
  }

  private _messageErrorLog(error: Readonly<string>): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `il est midi message sending failed`
      ),
    });
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().error(error),
    });
  }

  private _sendMessageToSoniaDiscord(error: Readonly<string>): void {
    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(
        error
      ),
    });
  }

  private _logJobRule(rule: Readonly<string>, jobName: Readonly<string>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `${jobName} rule: ${ChalkService.getInstance().value(rule)}`
      ),
    });
  }
}
