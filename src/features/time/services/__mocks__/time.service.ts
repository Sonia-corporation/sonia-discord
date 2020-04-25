import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";

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
    let value = `now`;

    if (_.isString(format)) {
      value = `${value}-format`;
    }

    return value;
  }

  public fromNow(): string {
    return `from-now`;
  }
}
