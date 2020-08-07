import { Guild, Snowflake } from "discord.js";
import admin, { firestore } from "firebase-admin";
import _ from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { DiscordClientService } from "../../discord/services/discord-client.service";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseCollectionEnum } from "../enums/firebase-collection.enum";
import { createFirebaseGuild } from "../functions/create-firebase-guild";
import { IFirebaseGuild } from "../types/firebase-guild";
import { FirebaseAppService } from "./firebase-app.service";
import CollectionReference = admin.firestore.CollectionReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import Firestore = admin.firestore.Firestore;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import WriteBatch = admin.firestore.WriteBatch;
import WriteResult = admin.firestore.WriteResult;

export class FirebaseGuildsService extends AbstractService {
  private static _instance: FirebaseGuildsService;

  public static getInstance(): FirebaseGuildsService {
    if (_.isNil(FirebaseGuildsService._instance)) {
      FirebaseGuildsService._instance = new FirebaseGuildsService();
    }

    return FirebaseGuildsService._instance;
  }

  private readonly _firebaseAppService: FirebaseAppService = FirebaseAppService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _isReady$: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  private readonly _onGuildsChange$: BehaviorSubject<
    IFirebaseGuild[]
  > = new BehaviorSubject<IFirebaseGuild[]>([]);
  private _store: Firestore | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
  }

  public init(): Promise<void> {
    return this._setStore().then((): void => {
      this._logGuildCount();
      this._watchGuilds();
    });
  }

  public getCollectionReference():
    | CollectionReference<IFirebaseGuild>
    | undefined {
    if (!_.isNil(this._store)) {
      return this._store.collection(`/${FirebaseCollectionEnum.GUILDS}`);
    }

    this._loggerService.warning({
      context: this._serviceName,
      message: this._chalkService.text(`store not set`),
    });

    return undefined;
  }

  public getGuilds(): Promise<QuerySnapshot<IFirebaseGuild>> {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      return collectionReference.get();
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  public getGuildsCount(): Promise<number> {
    return this.getGuilds().then(
      (querySnapshot: QuerySnapshot<IFirebaseGuild>): number => {
        return querySnapshot.size;
      }
    );
  }

  public hasGuild(guildId: Readonly<Snowflake>): Promise<boolean> {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      return collectionReference
        .doc(guildId)
        .get()
        .then(
          (
            documentSnapshot: DocumentSnapshot<IFirebaseGuild>
          ): Promise<boolean> => {
            return Promise.resolve(documentSnapshot.exists);
          }
        )
        .catch(
          (): Promise<boolean> => {
            this._loggerService.error({
              context: this._serviceName,
              message: this._chalkService.text(
                `failed to check if Firebase has ${this._chalkService.value(
                  guildId
                )} guild`
              ),
            });

            return Promise.resolve(false);
          }
        );
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  public addGuild(guild: Readonly<Guild>): Promise<WriteResult> {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`creating Firebase guild...`),
      });

      return collectionReference
        .doc(guild.id)
        .set(
          createFirebaseGuild({
            id: guild.id,
          })
        )
        .then(
          (writeResult: WriteResult): Promise<WriteResult> => {
            this._loggerService.success({
              context: this._serviceName,
              message: this._chalkService.text(
                `Firebase guild ${this._chalkService.value(guild.id)} created`
              ),
            });

            return Promise.resolve(writeResult);
          }
        );
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  public isReady$(): Observable<boolean> {
    return this._isReady$.asObservable();
  }

  public isReady(): Promise<true> {
    return this.isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean => {
          return _.isEqual(isReady, true);
        }),
        take(1),
        map((): true => true)
      )
      .toPromise();
  }

  public notifyIsReady(): void {
    this._isReady$.next(true);
  }

  public onGuildsChange$(): Observable<IFirebaseGuild[]> {
    return this._onGuildsChange$.asObservable();
  }

  public notifyOnGuildsChange(guilds: Readonly<IFirebaseGuild>[]): void {
    this._onGuildsChange$.next(guilds);
  }

  public getBatch(): WriteBatch | undefined {
    if (!_.isNil(this._store)) {
      return this._store.batch();
    }

    return undefined;
  }

  private _watchGuilds(): void {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`watching Firebase guilds...`),
      });

      collectionReference.onSnapshot(
        (querySnapshot: QuerySnapshot<IFirebaseGuild>): void => {
          const firebaseGuilds: IFirebaseGuild[] = [];

          querySnapshot.forEach(
            (
              queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>
            ): void => {
              if (_.isEqual(queryDocumentSnapshot.exists, true)) {
                firebaseGuilds.push(queryDocumentSnapshot.data());
              }
            }
          );

          this.notifyOnGuildsChange(firebaseGuilds);
        },
        (error: Readonly<Error>): void => {
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(
              `Firebase guilds watcher catch an error`
            ),
          });
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.error(error),
          });
        }
      );
    } else {
      throw new Error(`Collection not available`);
    }
  }

  private _setStore(): Promise<true> {
    return this._discordClientService.isReady().then(
      (): Promise<true> => {
        this._store = firestore(this._firebaseAppService.getApp());
        this._store.settings({
          ignoreUndefinedProperties: true,
        });

        this.notifyIsReady();

        return Promise.resolve(true);
      }
    );
  }

  private _logGuildCount(): Promise<number> {
    return this.getGuildsCount().then(
      (count: Readonly<number>): Promise<number> => {
        this._loggerService.debug({
          context: this._serviceName,
          message: this._chalkService.text(
            `${this._chalkService.value(count)} guild${
              _.gt(count, 1) ? `s` : ``
            } found`
          ),
        });

        return Promise.resolve(count);
      }
    );
  }
}
