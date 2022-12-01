import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInBold } from '../../../../functions/formatters/wrap-in-bold';
import { wrapUserIdIntoMention } from '../../../discord/mentions/functions/wrap-user-id-into-mention';
import { DiscordSoniaConfigService } from '../../../discord/users/services/config/discord-sonia-config.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import _ from 'lodash';

const ONE_DM = 1;
const NO_DM = 0;
const NO_USER = 0;

export class FirebaseDmsNewVersionCountHumanizedService extends AbstractService {
  private static _instance: FirebaseDmsNewVersionCountHumanizedService;

  public static getInstance(): FirebaseDmsNewVersionCountHumanizedService {
    if (_.isNil(FirebaseDmsNewVersionCountHumanizedService._instance)) {
      FirebaseDmsNewVersionCountHumanizedService._instance = new FirebaseDmsNewVersionCountHumanizedService();
    }

    return FirebaseDmsNewVersionCountHumanizedService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_COUNT_HUMANIZED_SERVICE);
  }

  public getHumanizedCount(totalUserCount: number, dmCount: number): string {
    if (_.isEqual(totalUserCount, NO_USER)) {
      return this._getNoTotalUserCount();
    }

    if (_.isEqual(dmCount, NO_DM)) {
      return this._getNoDmCount(totalUserCount);
    }

    return this._getCount(totalUserCount, dmCount);
  }

  public getHumanizedCountForLogs(totalUserCount: number, dmCount: number): string {
    if (_.isEqual(totalUserCount, NO_USER)) {
      return this._getNoTotalUserCountForLogs();
    }

    if (_.isEqual(dmCount, NO_DM)) {
      return this._getNoDmCountForLogs(totalUserCount);
    }

    return this._getCountForLogs(totalUserCount, dmCount);
  }

  private _getNoTotalUserCount(): string {
    return `No release note messages were sent today.`;
  }

  private _getNoDmCount(totalUserCount: number): string {
    return `No release note messages were sent today for the ${wrapInBold(totalUserCount)} user${
      _.gt(totalUserCount, ONE_DM) ? `s` : ``
    } using ${wrapUserIdIntoMention(DiscordSoniaConfigService.getInstance().getId())}.`;
  }

  private _getCount(totalUserCount: number, dmCount: number): string {
    return `${wrapInBold(dmCount)} release note message${
      _.gt(dmCount, ONE_DM) ? `s were` : ` was`
    } sent over ${wrapInBold(totalUserCount)} user${
      _.gt(totalUserCount, ONE_DM) ? `s` : ``
    } using ${wrapUserIdIntoMention(DiscordSoniaConfigService.getInstance().getId())}.`;
  }

  private _getNoTotalUserCountForLogs(): string {
    return `no release note message sent`;
  }

  private _getNoDmCountForLogs(totalUserCount: number): string {
    return `no release note message sent for the ${ChalkService.getInstance().value(totalUserCount)} user${
      _.gt(totalUserCount, ONE_DM) ? `s` : ``
    }`;
  }

  private _getCountForLogs(totalUserCount: number, dmCount: number): string {
    return `${ChalkService.getInstance().value(dmCount)} release note message${
      _.gt(dmCount, ONE_DM) ? `s` : ``
    } sent over ${ChalkService.getInstance().value(totalUserCount)} user${_.gt(totalUserCount, ONE_DM) ? `s` : ``}`;
  }
}
