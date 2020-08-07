import _ from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";

export class FirebaseGuildsBreakingChangeService extends AbstractService {
  private static _instance: FirebaseGuildsBreakingChangeService;

  public static getInstance(): FirebaseGuildsBreakingChangeService {
    if (_.isNil(FirebaseGuildsBreakingChangeService._instance)) {
      FirebaseGuildsBreakingChangeService._instance = new FirebaseGuildsBreakingChangeService();
    }

    return FirebaseGuildsBreakingChangeService._instance;
  }

  private readonly _hasFinished$: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_BREAKING_CHANGES_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}

  public hasFinished$(): Observable<boolean> {
    return this._hasFinished$.asObservable();
  }

  public hasFinished(): Promise<true> {
    return this.hasFinished$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean => {
          return _.isEqual(isReady, true);
        }),
        take(1),
        map((): true => true)
      )
      .toPromise();
  }

  public notifyHasFinished(): void {
    this._hasFinished$.next(true);
  }
}
