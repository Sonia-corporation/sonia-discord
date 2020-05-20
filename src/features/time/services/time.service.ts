import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { fromNow } from "../functions/from-now";

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

  public now(format?: Readonly<string>): string {
    return moment().format(format);
  }

  public fromNow<T = string>(
    date: Readonly<T>,
    isCapitalized: Readonly<boolean> = true
  ): string {
    return fromNow<T>(date, isCapitalized);
  }
}
