import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { wrapInBold } from '../../../../../functions/formatters/wrap-in-bold';
import { ChalkService } from '../../../../logger/services/chalk/chalk.service';
import { wrapUserIdIntoMention } from '../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordSoniaConfigService } from '../../../users/services/config/discord-sonia-config.service';
import _ from 'lodash';

const ONE_GUILD = 1;
const ONE_CHANNEL = 1;
const NO_GUILD = 0;

export class DiscordMessageScheduleNoonCountHumanizedService extends AbstractService {
  private static _instance: DiscordMessageScheduleNoonCountHumanizedService;

  public static getInstance(): DiscordMessageScheduleNoonCountHumanizedService {
    if (_.isNil(DiscordMessageScheduleNoonCountHumanizedService._instance)) {
      DiscordMessageScheduleNoonCountHumanizedService._instance = new DiscordMessageScheduleNoonCountHumanizedService();
    }

    return DiscordMessageScheduleNoonCountHumanizedService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_HUMANIZED_SERVICE);
  }

  public getHumanizedCount(totalGuildCount: number, guildCount: number, channelCount: number): string {
    if (_.isEqual(totalGuildCount, NO_GUILD)) {
      return this._getNoTotalGuildCount();
    }

    if (_.isEqual(channelCount, NO_GUILD)) {
      return this._getNoGuildCount(totalGuildCount);
    }

    return this._getCount(totalGuildCount, guildCount, channelCount);
  }

  public getHumanizedCountForLogs(totalGuildCount: number, guildCount: number, channelCount: number): string {
    if (_.isEqual(totalGuildCount, NO_GUILD)) {
      return this._getNoTotalGuildCountForLogs();
    }

    if (_.isEqual(channelCount, NO_GUILD)) {
      return this._getNoGuildCountForLogs(totalGuildCount);
    }

    return this._getCountForLogs(totalGuildCount, guildCount, channelCount);
  }

  private _getNoTotalGuildCount(): string {
    return `No noon messages were sent today.`;
  }

  private _getNoGuildCount(totalGuildCount: number): string {
    return `No noon messages were sent today for the ${wrapInBold(totalGuildCount)} guild${
      _.gt(totalGuildCount, ONE_GUILD) ? `s` : ``
    } using ${wrapUserIdIntoMention(DiscordSoniaConfigService.getInstance().getId())}.`;
  }

  private _getCount(totalGuildCount: number, guildCount: number, channelCount: number): string {
    return `${wrapInBold(channelCount)} noon message${
      _.gt(channelCount, ONE_CHANNEL) ? `s were` : ` was`
    } sent over ${wrapInBold(guildCount)} of ${wrapInBold(totalGuildCount)} guild${
      _.gt(guildCount, ONE_GUILD) ? `s` : ``
    } using ${wrapUserIdIntoMention(DiscordSoniaConfigService.getInstance().getId())}.`;
  }

  private _getNoTotalGuildCountForLogs(): string {
    return `no noon message sent`;
  }

  private _getNoGuildCountForLogs(totalGuildCount: number): string {
    return `no noon message sent for the ${ChalkService.getInstance().value(totalGuildCount)} guild${
      _.gt(totalGuildCount, ONE_GUILD) ? `s` : ``
    }`;
  }

  private _getCountForLogs(totalGuildCount: number, guildCount: number, channelCount: number): string {
    return `${ChalkService.getInstance().value(channelCount)} noon message${
      _.gt(channelCount, ONE_CHANNEL) ? `s` : ``
    } sent over ${ChalkService.getInstance().value(guildCount)} of ${ChalkService.getInstance().value(
      totalGuildCount
    )} guild${_.gt(totalGuildCount, ONE_GUILD) ? `s` : ``}`;
  }
}
