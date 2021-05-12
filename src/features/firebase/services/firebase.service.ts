import { FirebaseAppService } from './firebase-app.service';
import { FirebaseGuildsBreakingChangeService } from './guilds/firebase-guilds-breaking-change.service';
import { FirebaseGuildsNewVersionService } from './guilds/firebase-guilds-new-version.service';
import { FirebaseGuildsService } from './guilds/firebase-guilds.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { FirebaseGuildsStoreService } from '../stores/guilds/services/firebase-guilds-store.service';
import admin from 'firebase-admin';
import _ from 'lodash';

export class FirebaseService extends AbstractService {
  private static _instance: FirebaseService;

  public static getInstance(): FirebaseService {
    if (_.isNil(FirebaseService._instance)) {
      FirebaseService._instance = new FirebaseService();
    }

    return FirebaseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_SERVICE);
  }

  public init(): Promise<[number | void, admin.firestore.WriteResult[] | void]> {
    FirebaseAppService.getInstance().init();
    void FirebaseGuildsNewVersionService.getInstance().init();
    FirebaseGuildsStoreService.getInstance().init();

    return Promise.all([
      FirebaseGuildsService.getInstance()
        .init()
        .catch((): void => {
          this._logFirebaseGuildsServiceInitError();
        }),
      FirebaseGuildsBreakingChangeService.getInstance()
        .init()
        .then((writeResults: admin.firestore.WriteResult[] | void): Promise<admin.firestore.WriteResult[] | void> => {
          FirebaseGuildsService.getInstance().watchGuilds();

          return Promise.resolve(writeResults);
        })
        .catch((): void => {
          this._logFirebaseGuildsBreakingChangeServiceInitError();
        }),
    ]);
  }

  private _logFirebaseGuildsServiceInitError(): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`FirebaseGuildsService init failed`),
    });
  }

  private _logFirebaseGuildsBreakingChangeServiceInitError(): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`FirebaseGuildsBreakingChangeService init failed`),
    });
  }
}
