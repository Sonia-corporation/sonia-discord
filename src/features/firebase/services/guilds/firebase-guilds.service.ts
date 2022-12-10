import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FirebaseCollectionEnum } from '../../enums/firebase-collection.enum';
import { createFirebaseGuild } from '../../functions/guilds/create-firebase-guild';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { FirebaseStoreService } from '../firebase-store.service';
import { Guild, Snowflake } from 'discord.js';
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

const ONE_GUILD = 1;

export class FirebaseGuildsService extends AbstractService {
  private static _instance: FirebaseGuildsService;

  public static getInstance(): FirebaseGuildsService {
    if (_.isNil(FirebaseGuildsService._instance)) {
      FirebaseGuildsService._instance = new FirebaseGuildsService();
    }

    return FirebaseGuildsService._instance;
  }

  private readonly _onGuildsChange$: BehaviorSubject<IFirebaseGuild[]> = new BehaviorSubject<IFirebaseGuild[]>([]);

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
  }

  public async init(): Promise<void> {
    await this._logGuildCount();
  }

  public getCollectionReference(): CollectionReference<IFirebaseGuild> | undefined {
    const store: Firestore | undefined = FirebaseStoreService.getInstance().getStore();

    if (_.isNil(store)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`store not set`),
      });

      return undefined;
    }

    return store.collection(FirebaseCollectionEnum.GUILDS);
  }

  public getGuilds(): Promise<QuerySnapshot<IFirebaseGuild> | never> {
    const collectionReference: CollectionReference<IFirebaseGuild> | undefined = this.getCollectionReference();

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

  public getGuildsCount(): Promise<number> {
    return this.getGuilds().then(({ size }: QuerySnapshot<IFirebaseGuild>): number => size);
  }

  public hasGuild(guildId: Snowflake): Promise<boolean> {
    const collectionReference: CollectionReference<IFirebaseGuild> | undefined = this.getCollectionReference();

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
      .doc(guildId)
      .get()
      .then(
        ({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          exists,
        }: DocumentSnapshot<IFirebaseGuild>): Promise<boolean> => Promise.resolve(exists)
      )
      .catch((): Promise<boolean> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `failed to check if Firebase has ${ChalkService.getInstance().value(guildId)} guild`
          ),
        });

        return Promise.resolve(false);
      });
  }

  public getGuild(guildId: Snowflake): Promise<IFirebaseGuild | null | undefined> {
    const collectionReference: CollectionReference<IFirebaseGuild> | undefined = this.getCollectionReference();

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
      .doc(guildId)
      .get()
      .then((documentSnapshot: DocumentSnapshot<IFirebaseGuild>): Promise<IFirebaseGuild | null | undefined> => {
        if (!_.isEqual(documentSnapshot.exists, true)) {
          return Promise.resolve(null);
        }

        return Promise.resolve(documentSnapshot.data());
      })
      .catch((): Promise<null> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `failed to get the ${ChalkService.getInstance().value(guildId)} guild from Firebase`
          ),
        });

        return Promise.resolve(null);
      });
  }

  public addGuild({ id }: Guild): Promise<WriteResult> {
    const collectionReference: CollectionReference<IFirebaseGuild> | undefined = this.getCollectionReference();

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
      message: ChalkService.getInstance().text(`creating Firebase guild...`),
    });

    return collectionReference
      .doc(id)
      .set(
        createFirebaseGuild({
          id,
        })
      )
      .then((writeResult: WriteResult): Promise<WriteResult> => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`Firebase guild ${ChalkService.getInstance().value(id)} created`),
        });

        return Promise.resolve(writeResult);
      });
  }

  public onGuildsChange$(): Observable<IFirebaseGuild[]> {
    return this._onGuildsChange$.asObservable();
  }

  public notifyOnGuildsChange(guilds: IFirebaseGuild[]): void {
    this._onGuildsChange$.next(guilds);
  }

  public getBatch(): WriteBatch | undefined {
    const store: Firestore | undefined = FirebaseStoreService.getInstance().getStore();

    if (_.isNil(store)) {
      return undefined;
    }

    return store.batch();
  }

  public watchGuilds(): void {
    const collectionReference: CollectionReference<IFirebaseGuild> | undefined = this.getCollectionReference();

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
      message: ChalkService.getInstance().text(`watching Firebase guilds...`),
    });

    collectionReference.onSnapshot(
      (querySnapshot: QuerySnapshot<IFirebaseGuild>): void => {
        const firebaseGuilds: IFirebaseGuild[] = [];

        querySnapshot.forEach(
          // eslint-disable-next-line @typescript-eslint/naming-convention
          (queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>): void => {
            if (_.isEqual(queryDocumentSnapshot.exists, true)) {
              firebaseGuilds.push(queryDocumentSnapshot.data());
            }
          }
        );

        this.notifyOnGuildsChange(firebaseGuilds);
      },
      (error: Error): void => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`Firebase guilds watcher catch an error`),
        });
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().error(error),
        });
      }
    );
  }

  private _logGuildCount(): Promise<number> {
    return this.getGuildsCount().then((count: number): Promise<number> => {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `${ChalkService.getInstance().value(count)} guild${_.gt(count, ONE_GUILD) ? `s` : ``} found`
        ),
      });

      return Promise.resolve(count);
    });
  }
}
