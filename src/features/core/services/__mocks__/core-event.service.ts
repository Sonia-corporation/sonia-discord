import _ from "lodash";
import { EMPTY, Observable } from "rxjs";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";

export class CoreEventService {
  private static _instance: CoreEventService;

  public static getInstance(): CoreEventService {
    if (_.isNil(CoreEventService._instance)) {
      CoreEventService._instance = new CoreEventService();
    }

    return CoreEventService._instance;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public notifyServiceCreated(): void {}

  public serviceCreated$(): Observable<ServiceNameEnum> {
    return EMPTY;
  }

  public getCreatedServices(): ServiceNameEnum[] {
    return [];
  }
}
