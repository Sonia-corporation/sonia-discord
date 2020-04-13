import _ from "lodash";
import moment from "moment";

export class TimeService {
  private static _instance: TimeService;

  public static getInstance(): TimeService {
    if (_.isNil(TimeService._instance)) {
      TimeService._instance = new TimeService();
    }

    return TimeService._instance;
  }

  public now(format?: Readonly<string>): string {
    return moment().format(format);
  }

  public fromNow(
    date: Readonly<string>,
    capitalize: Readonly<boolean> = true
  ): string {
    const newDate: string = moment(date).fromNow();

    if (_.isEqual(capitalize, true)) {
      return _.capitalize(newDate);
    }

    return newDate;
  }
}
