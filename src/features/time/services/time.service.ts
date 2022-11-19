import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { fromNow } from '../functions/from-now';
import _ from 'lodash';
import moment, { MomentInput } from 'moment-timezone';

export class TimeService extends AbstractService {
  private static _instance: TimeService;

  public static getInstance(): TimeService {
    if (_.isNil(TimeService._instance)) {
      TimeService._instance = new TimeService();
    }

    return TimeService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.TIME_SERVICE);
  }

  public now(format?: string): string {
    return moment().format(format);
  }

  public fromNow(date: MomentInput, isCapitalized = true): string {
    return fromNow(date, isCapitalized);
  }
}
