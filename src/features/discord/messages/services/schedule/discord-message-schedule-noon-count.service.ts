import { Message } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { ChalkService } from "../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../logger/services/logger.service";

const DEFAULT_GUILD_COUNT = 0;
const ONE_GUILD = 1;
const DEFAULT_CHANNEL_COUNT = 0;
const ONE_CHANNEL = 1;
const NO_GUILD = 0;

export class DiscordMessageScheduleNoonCountService extends AbstractService {
  private static _instance: DiscordMessageScheduleNoonCountService;

  public static getInstance(): DiscordMessageScheduleNoonCountService {
    if (_.isNil(DiscordMessageScheduleNoonCountService._instance)) {
      DiscordMessageScheduleNoonCountService._instance = new DiscordMessageScheduleNoonCountService();
    }

    return DiscordMessageScheduleNoonCountService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_SERVICE);
  }

  /**
   * @description
   * Each array is like a guild (without or without messages)
   * Each {@link Message} is a message sent to Discord on a channel
   *
   * The goal here is to count the number of guilds
   * Then the number of messages (ak channels)
   * Then the number of messages per guild
   *
   * @param {Readonly<((Message | void)[] | void)[] | void>} guildMessages The list received as a response when sending noon messages to all Discord guilds
   */
  public countChannelsAndGuilds(
    guildMessages: Readonly<((Message | void)[] | void)[] | void>
  ): void {
    let totalGuildCount = DEFAULT_GUILD_COUNT;
    let guildCount = DEFAULT_GUILD_COUNT;
    let channelCount = DEFAULT_CHANNEL_COUNT;

    if (_.isArray(guildMessages)) {
      _.forEach(
        guildMessages,
        (guildMessage: Readonly<(Message | void)[] | void>): void => {
          totalGuildCount = _.add(totalGuildCount, ONE_GUILD);

          if (_.isArray(guildMessage)) {
            let hasCountThisGuild = false;

            _.forEach(
              guildMessage,
              (message: Readonly<Message | void>): void => {
                if (!_.isNil(message)) {
                  channelCount = _.add(channelCount, ONE_CHANNEL);

                  if (_.isEqual(hasCountThisGuild, false)) {
                    guildCount = _.add(guildCount, ONE_GUILD);
                    hasCountThisGuild = true;
                  }
                }
              }
            );
          }
        }
      );
    }

    this._logGuildAndChannelCount(totalGuildCount, guildCount, channelCount);
  }

  private _logGuildAndChannelCount(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): void {
    let message = `${ChalkService.getInstance().value(
      channelCount
    )} noon message${
      _.gt(channelCount, ONE_CHANNEL) ? `s` : ``
    } sent over ${ChalkService.getInstance().value(guildCount)} guild${
      _.gt(guildCount, ONE_GUILD) ? `s` : ``
    } of ${ChalkService.getInstance().value(totalGuildCount)}`;

    if (_.isEqual(channelCount, NO_GUILD)) {
      message = `no noon message sent for the ${ChalkService.getInstance().value(
        totalGuildCount
      )} guild${_.gt(totalGuildCount, ONE_GUILD) ? `s` : ``}`;
    }

    if (_.isEqual(totalGuildCount, NO_GUILD)) {
      message = `no noon message sent`;
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(message),
    });
  }
}
