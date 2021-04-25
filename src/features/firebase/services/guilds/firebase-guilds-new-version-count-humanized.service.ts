import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInBold } from '../../../../functions/formatters/wrap-in-bold';
import { wrapUserIdIntoMention } from '../../../discord/mentions/functions/wrap-user-id-into-mention';
import { DiscordSoniaConfigService } from '../../../discord/users/services/config/discord-sonia-config.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import _ from 'lodash';

const ONE_GUILD = 1;
const ONE_CHANNEL = 1;
const NO_GUILD = 0;

export class FirebaseGuildsNewVersionCountHumanizedService extends AbstractService {
  private static _instance: FirebaseGuildsNewVersionCountHumanizedService;

  public static getInstance(): FirebaseGuildsNewVersionCountHumanizedService {
    if (_.isNil(FirebaseGuildsNewVersionCountHumanizedService._instance)) {
      FirebaseGuildsNewVersionCountHumanizedService._instance = new FirebaseGuildsNewVersionCountHumanizedService();
    }

    return FirebaseGuildsNewVersionCountHumanizedService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_HUMANIZED_SERVICE);
  }

  public getHumanizedCount(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): string {
    if (_.isEqual(totalGuildCount, NO_GUILD)) {
      return this._getNoTotalGuildCount();
    }

    if (_.isEqual(channelCount, NO_GUILD)) {
      return this._getNoGuildCount(totalGuildCount);
    }

    return this._getCount(totalGuildCount, guildCount, channelCount);
  }

  public getHumanizedCountForLogs(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): string {
    if (_.isEqual(totalGuildCount, NO_GUILD)) {
      return this._getNoTotalGuildCountForLogs();
    }

    if (_.isEqual(channelCount, NO_GUILD)) {
      return this._getNoGuildCountForLogs(totalGuildCount);
    }

    return this._getCountForLogs(totalGuildCount, guildCount, channelCount);
  }

  private _getNoTotalGuildCount(): string {
    return `No release note messages were sent today.`;
  }

  private _getNoGuildCount(totalGuildCount: Readonly<number>): string {
    return `No release note messages were sent today for the ${wrapInBold(totalGuildCount)} guild${
      _.gt(totalGuildCount, ONE_GUILD) ? `s` : ``
    } using ${wrapUserIdIntoMention(DiscordSoniaConfigService.getInstance().getId())}.`;
  }

  private _getCount(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): string {
    return `${wrapInBold(channelCount)} release note message${
      _.gt(channelCount, ONE_CHANNEL) ? `s were` : ` was`
    } sent over ${wrapInBold(guildCount)} of ${wrapInBold(totalGuildCount)} guild${
      _.gt(guildCount, ONE_GUILD) ? `s` : ``
    } using ${wrapUserIdIntoMention(DiscordSoniaConfigService.getInstance().getId())}.`;
  }

  private _getNoTotalGuildCountForLogs(): string {
    return `no release note message sent`;
  }

  private _getNoGuildCountForLogs(totalGuildCount: Readonly<number>): string {
    return `no release note message sent for the ${ChalkService.getInstance().value(totalGuildCount)} guild${
      _.gt(totalGuildCount, ONE_GUILD) ? `s` : ``
    }`;
  }

  private _getCountForLogs(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): string {
    return `${ChalkService.getInstance().value(channelCount)} release note message${
      _.gt(channelCount, ONE_CHANNEL) ? `s` : ``
    } sent over ${ChalkService.getInstance().value(guildCount)} guild${
      _.gt(guildCount, ONE_GUILD) ? `s` : ``
    } of ${ChalkService.getInstance().value(totalGuildCount)}`;
  }
}
