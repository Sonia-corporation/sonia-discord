import { DiscordMessageScheduleNoonCountHumanizedService } from './discord-message-schedule-noon-count-humanized.service';
import { DiscordMessageScheduleNoonCountMessageResponseService } from './discord-message-schedule-noon-count-message-response.service';
import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { ChalkService } from '../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordGuildSoniaChannelNameEnum } from '../../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { Message } from 'discord.js';
import _ from 'lodash';

const DEFAULT_GUILD_COUNT = 0;
const ONE_GUILD = 1;
const DEFAULT_CHANNEL_COUNT = 0;
const ONE_CHANNEL = 1;

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
   * Each array is like a guild (without or without messages).
   * Each {@link Message} is a message sent to Discord on a channel.
   * The goal here is to count the number of guilds.
   * Then the number of messages (ak channels).
   * Then the number of messages per guild.
   * @param {((Message | void)[] | void)[] | void} guildMessages The list received as a response when sending noon messages to all Discord guilds.
   */
  public countChannelsAndGuilds(guildMessages: ((Message | void)[] | void)[] | void): void {
    let totalGuildCount = DEFAULT_GUILD_COUNT;
    let guildCount = DEFAULT_GUILD_COUNT;
    let channelCount = DEFAULT_CHANNEL_COUNT;

    if (_.isArray(guildMessages)) {
      const typedGuildMessages: ((Message | void)[] | void)[] = guildMessages;

      _.forEach(typedGuildMessages, (guildMessage: (Message | void)[] | void): void => {
        totalGuildCount = _.add(totalGuildCount, ONE_GUILD);

        if (_.isArray(guildMessage)) {
          const typedGuildMessage: (Message | void)[] = guildMessage;
          let hasCountThisGuild = false;

          _.forEach(typedGuildMessage, (message: Message | void): void => {
            if (!_.isNil(message)) {
              channelCount = _.add(channelCount, ONE_CHANNEL);

              if (_.isEqual(hasCountThisGuild, false)) {
                guildCount = _.add(guildCount, ONE_GUILD);
                hasCountThisGuild = true;
              }
            }
          });
        }
      });
    }

    this._logGuildAndChannelCount(totalGuildCount, guildCount, channelCount);

    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.LOGS,
      messageResponse: DiscordMessageScheduleNoonCountMessageResponseService.getInstance().getMessageResponse(
        totalGuildCount,
        guildCount,
        channelCount
      ),
    });
  }

  private _logGuildAndChannelCount(totalGuildCount: number, guildCount: number, channelCount: number): void {
    const message: string = DiscordMessageScheduleNoonCountHumanizedService.getInstance().getHumanizedCountForLogs(
      totalGuildCount,
      guildCount,
      channelCount
    );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(message),
    });
  }
}
