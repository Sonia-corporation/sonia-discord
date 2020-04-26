import _ from "lodash";
import { Observable, Subject } from "rxjs";
import { ServiceNameEnum } from "../../../enums/service-name.enum";

export class CoreEventService {
  private static _instance: CoreEventService;

  public static getInstance(): CoreEventService {
    if (_.isNil(CoreEventService._instance)) {
      CoreEventService._instance = new CoreEventService();
    }

    return CoreEventService._instance;
  }

  private readonly _serviceCreated$: Subject<ServiceNameEnum> = new Subject<
    ServiceNameEnum
  >();
  private readonly _createdServices: ServiceNameEnum[] = [
    ServiceNameEnum.CORE_SERVICE,
    ServiceNameEnum.CORE_EVENT_SERVICE,
  ];

  public init(): void {
    this._listenServiceCreated();
  }

  public notifyServiceCreated(serviceName: Readonly<ServiceNameEnum>): void {
    this._serviceCreated$.next(serviceName);
  }

  public serviceCreated$(): Observable<ServiceNameEnum> {
    return this._serviceCreated$.asObservable();
  }

  public getCreatedServices(): ServiceNameEnum[] {
    return this._createdServices;
  }

  private _listenServiceCreated(): void {
    this._serviceCreated$.subscribe({
      next: (serviceName: Readonly<ServiceNameEnum>): void => {
        this._createdServices.push(serviceName);
      },
    });
  }
}
