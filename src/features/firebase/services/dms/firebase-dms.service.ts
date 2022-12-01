import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FirebaseCollectionEnum } from '../../enums/firebase-collection.enum';
import { createFirebaseDm } from '../../functions/dms/create-firebase-dm';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { FirebaseStoreService } from '../firebase-store.service';
import { Snowflake } from 'discord.js';
import {
  CollectionReference,
  DocumentSnapshot,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteBatch,
  WriteResult,
} from 'firebase-admin/firestore';
import _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

const ONE_DM = 1;

export class FirebaseDmsService extends AbstractService {
  private static _instance: FirebaseDmsService;

  public static getInstance(): FirebaseDmsService {
    if (_.isNil(FirebaseDmsService._instance)) {
      FirebaseDmsService._instance = new FirebaseDmsService();
    }

    return FirebaseDmsService._instance;
  }

  private readonly _onDmsChange$: BehaviorSubject<IFirebaseDm[]> = new BehaviorSubject<IFirebaseDm[]>([]);

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_SERVICE);
  }

  public async init(): Promise<void> {
    await this._logDmCount();
  }

  public getCollectionReference(): CollectionReference<IFirebaseDm> | undefined {
    const store: Firestore | undefined = FirebaseStoreService.getInstance().getStore();

    if (_.isNil(store)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`store not set`),
      });

      return undefined;
    }

    return store.collection(FirebaseCollectionEnum.DMS);
  }

  public getDms(): Promise<QuerySnapshot<IFirebaseDm> | never> {
    const collectionReference: CollectionReference<IFirebaseDm> | undefined = this.getCollectionReference();

    if (_.isNil(collectionReference)) {
      return Promise.reject(new Error(`Collection not available`));
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    return collectionReference.get().catch((error: Error): never => {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(error),
      });

      throw error;
    });
  }

  public getDmsCount(): Promise<number> {
    return this.getDms().then(({ size }: QuerySnapshot<IFirebaseDm>): number => size);
  }

  public hasDm(userId: Snowflake): Promise<boolean> {
    const collectionReference: CollectionReference<IFirebaseDm> | undefined = this.getCollectionReference();

    if (_.isNil(collectionReference)) {
      return Promise.reject(new Error(`Collection not available`));
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    return collectionReference
      .doc(userId)
      .get()
      .then(
        ({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          exists,
        }: DocumentSnapshot<IFirebaseDm>): Promise<boolean> => Promise.resolve(exists)
      )
      .catch((): Promise<boolean> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `failed to check if Firebase has DM ${ChalkService.getInstance().value(userId)}`
          ),
        });

        return Promise.resolve(false);
      });
  }

  public getDm(userId: Snowflake): Promise<IFirebaseDm | null | undefined> {
    const collectionReference: CollectionReference<IFirebaseDm> | undefined = this.getCollectionReference();

    if (_.isNil(collectionReference)) {
      return Promise.reject(new Error(`Collection not available`));
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    return collectionReference
      .doc(userId)
      .get()
      .then((documentSnapshot: DocumentSnapshot<IFirebaseDm>): Promise<IFirebaseDm | null | undefined> => {
        if (!_.isEqual(documentSnapshot.exists, true)) {
          return Promise.resolve(null);
        }

        return Promise.resolve(documentSnapshot.data());
      })
      .catch((): Promise<null> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `failed to get the DM ${ChalkService.getInstance().value(userId)} from Firebase`
          ),
        });

        return Promise.resolve(null);
      });
  }

  public addDm(userId: Snowflake): Promise<WriteResult> {
    const collectionReference: CollectionReference<IFirebaseDm> | undefined = this.getCollectionReference();

    if (_.isNil(collectionReference)) {
      return Promise.reject(new Error(`Collection not available`));
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`creating Firebase DM...`),
    });

    return collectionReference
      .doc(userId)
      .set(
        createFirebaseDm({
          id: userId,
        })
      )
      .then((writeResult: WriteResult): Promise<WriteResult> => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`Firebase DM ${ChalkService.getInstance().value(userId)} created`),
        });

        return Promise.resolve(writeResult);
      });
  }

  public onDmsChange$(): Observable<IFirebaseDm[]> {
    return this._onDmsChange$.asObservable();
  }

  public notifyOnDmsChange(dms: IFirebaseDm[]): void {
    this._onDmsChange$.next(dms);
  }

  public getBatch(): WriteBatch | undefined {
    const store: Firestore | undefined = FirebaseStoreService.getInstance().getStore();

    if (_.isNil(store)) {
      return undefined;
    }

    return store.batch();
  }

  public watchDms(): void {
    const collectionReference: CollectionReference<IFirebaseDm> | undefined = this.getCollectionReference();

    if (_.isNil(collectionReference)) {
      throw new Error(`Collection not available`);
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`watching Firebase DMs...`),
    });

    collectionReference.onSnapshot(
      (querySnapshot: QuerySnapshot<IFirebaseDm>): void => {
        const firebaseDms: IFirebaseDm[] = [];

        querySnapshot.forEach(
          // eslint-disable-next-line @typescript-eslint/naming-convention
          (queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseDm>): void => {
            if (_.isEqual(queryDocumentSnapshot.exists, true)) {
              firebaseDms.push(queryDocumentSnapshot.data());
            }
          }
        );

        this.notifyOnDmsChange(firebaseDms);
      },
      (error: Error): void => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`Firebase DMs watcher catch an error`),
        });
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().error(error),
        });
      }
    );
  }

  private _logDmCount(): Promise<number> {
    return this.getDmsCount().then((count: number): Promise<number> => {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `${ChalkService.getInstance().value(count)} DM${_.gt(count, ONE_DM) ? `s` : ``} found`
        ),
      });

      return Promise.resolve(count);
    });
  }
}
