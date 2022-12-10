import { FirebaseDmsNewVersionCountHumanizedService } from './firebase-dms-new-version-count-humanized.service';
import { FirebaseDmsNewVersionCountMessageResponseService } from './firebase-dms-new-version-count-message-response.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { DiscordGuildSoniaChannelNameEnum } from '../../../discord/guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { Message } from 'discord.js';
import _ from 'lodash';

const DEFAULT_DM_COUNT = 0;
const ONE_DM = 1;
const NO_DM = 0;

export class FirebaseDmsNewVersionCountService extends AbstractService {
  private static _instance: FirebaseDmsNewVersionCountService;

  public static getInstance(): FirebaseDmsNewVersionCountService {
    if (_.isNil(FirebaseDmsNewVersionCountService._instance)) {
      FirebaseDmsNewVersionCountService._instance = new FirebaseDmsNewVersionCountService();
    }

    return FirebaseDmsNewVersionCountService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_COUNT_SERVICE);
  }

  /**
   * @description
   * Each array is like a DM (without or without messages).
   * Each {@link Message} is a message sent to Discord as a DM.
   * The goal here is to count the number of DMs.
   * @param {((Message | void) | void)[] | void} dmMessages The list received as a response when sending release note messages to all Discord DMs.
   */
  public countDms(dmMessages: ((Message | null) | void)[] | void): void {
    let totalDmCount = DEFAULT_DM_COUNT;
    let dmCount = DEFAULT_DM_COUNT;

    if (_.isArray(dmMessages)) {
      const typedDmMessages: ((Message | null) | void)[] = dmMessages;

      _.forEach(typedDmMessages, (messages: (Message | null) | void): void => {
        totalDmCount = _.add(totalDmCount, ONE_DM);

        if (messages) {
          const typedDmMessage: Message | null = messages;

          if (!_.isNil(typedDmMessage)) {
            dmCount = _.add(dmCount, ONE_DM);
          }
        }
      });
    }

    this._logDmCount(totalDmCount, dmCount);

    if (_.gt(dmCount, NO_DM)) {
      DiscordGuildSoniaService.getInstance().sendMessageToChannel({
        channelName: DiscordGuildSoniaChannelNameEnum.LOGS,
        messageResponse: FirebaseDmsNewVersionCountMessageResponseService.getInstance().getMessageResponse(
          totalDmCount,
          dmCount
        ),
      });
    }
  }

  private _logDmCount(totalDmCount: number, dmCount: number): void {
    const message: string = FirebaseDmsNewVersionCountHumanizedService.getInstance().getHumanizedCountForLogs(
      totalDmCount,
      dmCount
    );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(message),
    });
  }
}
