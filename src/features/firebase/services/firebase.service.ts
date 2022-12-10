import { FirebaseDmsBreakingChangeService } from './dms/firebase-dms-breaking-change.service';
import { FirebaseDmsNewVersionService } from './dms/firebase-dms-new-version.service';
import { FirebaseDmsService } from './dms/firebase-dms.service';
import { FirebaseAppService } from './firebase-app.service';
import { FirebaseStoreService } from './firebase-store.service';
import { FirebaseGuildsBreakingChangeService } from './guilds/firebase-guilds-breaking-change.service';
import { FirebaseGuildsNewVersionService } from './guilds/firebase-guilds-new-version.service';
import { FirebaseGuildsService } from './guilds/firebase-guilds.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { FirebaseDmsStoreService } from '../stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../stores/guilds/services/firebase-guilds-store.service';
import { WriteResult } from 'firebase-admin/firestore';
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

  public async init(): Promise<void> {
    FirebaseAppService.getInstance().init();

    await FirebaseStoreService.getInstance().init();
    await this.initGuilds();
    await this.initDms();

    return Promise.resolve();
  }

  public initGuilds(): Promise<[number | void, WriteResult[] | void]> {
    void FirebaseGuildsNewVersionService.getInstance().init();
    FirebaseGuildsStoreService.getInstance().init();

    return Promise.all([
      FirebaseGuildsService.getInstance()
        .init()
        .catch((error: Error): never => {
          this._logFirebaseGuildsServiceInitError();

          throw error;
        }),
      FirebaseGuildsBreakingChangeService.getInstance()
        .init()
        .then((writeResults: WriteResult[] | void): Promise<WriteResult[] | void> => {
          FirebaseGuildsService.getInstance().watchGuilds();

          return Promise.resolve(writeResults);
        })
        .catch((error: Error): never => {
          this._logFirebaseGuildsBreakingChangeServiceInitError();

          throw error;
        }),
    ]);
  }

  public initDms(): Promise<[number | void, WriteResult[] | void]> {
    void FirebaseDmsNewVersionService.getInstance().init();
    FirebaseDmsStoreService.getInstance().init();

    return Promise.all([
      FirebaseDmsService.getInstance()
        .init()
        .catch((error: Error): never => {
          this._logFirebaseDmsServiceInitError();

          throw error;
        }),
      FirebaseDmsBreakingChangeService.getInstance()
        .init()
        .then((writeResults: WriteResult[] | void): Promise<WriteResult[] | void> => {
          FirebaseDmsService.getInstance().watchDms();

          return Promise.resolve(writeResults);
        })
        .catch((error: Error): never => {
          this._logFirebaseDmsBreakingChangeServiceInitError();

          throw error;
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

  private _logFirebaseDmsServiceInitError(): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`FirebaseDmsService init failed`),
    });
  }

  private _logFirebaseDmsBreakingChangeServiceInitError(): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`FirebaseDmsBreakingChangeService init failed`),
    });
  }
}
