import _ from "lodash";
import moment from "moment";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";

export class TimeService extends AbstractService {
  private static _instance: TimeService;

  public static getInstance(): TimeService {
    if (_.isNil(TimeService._instance)) {
      TimeService._instance = new TimeService();
    }

    return TimeService._instance;
  }

  protected constructor() {
    super(ServiceNameEnum.TIME_SERVICE);
  }

  public now(format?: Readonly<string>): string {
    return moment().format(format);
  }

  public fromNow(
    date: Readonly<string>,
    isCapitalized: Readonly<boolean> = true
  ): string {
    const newDate: string = moment(date, moment.ISO_8601).fromNow();

    if (_.isEqual(isCapitalized, true)) {
      return _.capitalize(newDate);
    }

    return newDate;
  }
}
