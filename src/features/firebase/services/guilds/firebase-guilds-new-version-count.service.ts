import { FirebaseGuildsNewVersionCountHumanizedService } from './firebase-guilds-new-version-count-humanized.service';
import { FirebaseGuildsNewVersionCountMessageResponseService } from './firebase-guilds-new-version-count-message-response.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { DiscordGuildSoniaChannelNameEnum } from '../../../discord/guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { Message } from 'discord.js';
import _ from 'lodash';

const DEFAULT_GUILD_COUNT = 0;
const ONE_GUILD = 1;
const DEFAULT_CHANNEL_COUNT = 0;
const ONE_CHANNEL = 1;

export class FirebaseGuildsNewVersionCountService extends AbstractService {
  private static _instance: FirebaseGuildsNewVersionCountService;

  public static getInstance(): FirebaseGuildsNewVersionCountService {
    if (_.isNil(FirebaseGuildsNewVersionCountService._instance)) {
      FirebaseGuildsNewVersionCountService._instance = new FirebaseGuildsNewVersionCountService();
    }

    return FirebaseGuildsNewVersionCountService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_SERVICE);
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
   * @param {Readonly<((Message | void)[] | void)[] | void>} guildMessages The list received as a response when sending release note messages to all Discord guilds
   */
  public countChannelsAndGuilds(guildMessages: Readonly<((Message | null)[] | void)[] | void>): void {
    let totalGuildCount = DEFAULT_GUILD_COUNT;
    let guildCount = DEFAULT_GUILD_COUNT;
    let channelCount = DEFAULT_CHANNEL_COUNT;

    if (_.isArray(guildMessages)) {
      _.forEach(guildMessages, (guildMessage: Readonly<(Message | void)[] | void>): void => {
        totalGuildCount = _.add(totalGuildCount, ONE_GUILD);

        if (_.isArray(guildMessage)) {
          let hasCountThisGuild = false;

          _.forEach(guildMessage, (message: Readonly<Message | void>): void => {
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
      messageResponse: FirebaseGuildsNewVersionCountMessageResponseService.getInstance().getMessageResponse(
        totalGuildCount,
        guildCount,
        channelCount
      ),
    });
  }

  private _logGuildAndChannelCount(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): void {
    const message: string = FirebaseGuildsNewVersionCountHumanizedService.getInstance().getHumanizedCountForLogs(
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
