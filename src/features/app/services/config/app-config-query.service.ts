import { AppConfigService } from './app-config.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { isValidDate } from '../../../../functions/checks/is-valid-date';
import { TimeService } from '../../../time/services/time.service';
import { AppProductionStateEnum } from '../../enums/app-production-state.enum';
import _ from 'lodash';
import moment from 'moment-timezone';

const ONE_RELEASE = 1;

export class AppConfigQueryService extends AbstractService {
  private static _instance: AppConfigQueryService;

  public static getInstance(): AppConfigQueryService {
    if (_.isNil(AppConfigQueryService._instance)) {
      AppConfigQueryService._instance = new AppConfigQueryService();
    }

    return AppConfigQueryService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.APP_CONFIG_QUERY_SERVICE);
  }

  public getFirstReleaseDateFormatted(format?: Readonly<string>): string {
    const firstReleaseDate: string = AppConfigService.getInstance().getFirstReleaseDate();

    if (isValidDate(firstReleaseDate)) {
      return moment(firstReleaseDate).format(format);
    }

    return firstReleaseDate;
  }

  public getInitializationDateHumanized(): string {
    const initializationDate: string = AppConfigService.getInstance().getInitializationDate();

    if (isValidDate(initializationDate)) {
      return TimeService.getInstance().fromNow(initializationDate);
    }

    return initializationDate;
  }

  public getProductionStateHumanized(): AppProductionStateEnum {
    return AppConfigService.getInstance().isProduction()
      ? AppProductionStateEnum.PRODUCTION
      : AppProductionStateEnum.DEVELOPMENT;
  }

  public getReleaseDateHumanized(): string {
    const releaseDate: string = AppConfigService.getInstance().getReleaseDate();

    if (!isValidDate(releaseDate)) {
      return releaseDate;
    }

    return TimeService.getInstance().fromNow(releaseDate);
  }

  public getTotalReleaseCountHumanized(releaseWord: Readonly<string> = `version`): string {
    const totalReleaseCount: number = AppConfigService.getInstance().getTotalReleaseCount();
    let sentence = `${_.toString(totalReleaseCount)} ${releaseWord}`;

    if (_.gt(totalReleaseCount, ONE_RELEASE)) {
      sentence = `${sentence}s`;
    }

    return sentence;
  }
}
