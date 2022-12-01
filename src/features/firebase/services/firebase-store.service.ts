import { FirebaseAppService } from './firebase-app.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { DiscordClientService } from '../../discord/services/discord-client.service';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { App } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import _ from 'lodash';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export class FirebaseStoreService extends AbstractService {
  private static _instance: FirebaseStoreService;

  public static getInstance(): FirebaseStoreService {
    if (_.isNil(FirebaseStoreService._instance)) {
      FirebaseStoreService._instance = new FirebaseStoreService();
    }

    return FirebaseStoreService._instance;
  }

  private readonly _isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _store: Firestore | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_STORE_SERVICE);
  }

  public init(): Promise<true> {
    return this._setStore();
  }

  public isReady$(): Observable<boolean> {
    return this._isReady$.asObservable();
  }

  public isReady(): Promise<true> {
    return firstValueFrom(
      this.isReady$().pipe(
        filter((isReady: boolean): boolean => _.isEqual(isReady, true)),
        take(ONE_EMITTER),
        map((): true => true)
      )
    );
  }

  public notifyIsReady(): void {
    this._isReady$.next(true);
  }

  public getStore(): Firestore | undefined {
    return this._store;
  }

  private _setStore(): Promise<true> {
    return DiscordClientService.getInstance()
      .isReady()
      .then((): Promise<true> => {
        const app: App | undefined = FirebaseAppService.getInstance().getApp();

        if (_.isNil(app)) {
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`app is unset`),
          });

          throw new Error(`app is unset`);
        }

        this._store = getFirestore(app);

        this._store.settings({
          ignoreUndefinedProperties: true,
        });
        this.notifyIsReady();

        return Promise.resolve(true);
      });
  }
}
