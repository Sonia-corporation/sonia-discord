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

  public init(): Promise<number> {
    return this._setStore().then((): Promise<number> => this._logGuildCount());
  }

  public getCollectionReference():
    | CollectionReference<IFirebaseGuild>
    | undefined {
    if (!_.isNil(this._store)) {
      return this._store.collection(`/${FirebaseCollectionEnum.GUILDS}`);
    }

    LoggerService.getInstance().warning({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`store not set`),
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
      (querySnapshot: Readonly<QuerySnapshot<IFirebaseGuild>>): number =>
        querySnapshot.size
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
            documentSnapshot: Readonly<DocumentSnapshot<IFirebaseGuild>>
          ): Promise<boolean> => Promise.resolve(documentSnapshot.exists)
        )
        .catch(
          (): Promise<boolean> => {
            LoggerService.getInstance().error({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `failed to check if Firebase has ${ChalkService.getInstance().value(
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
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`creating Firebase guild...`),
      });

      return collectionReference
        .doc(guild.id)
        .set(
          createFirebaseGuild({
            id: guild.id,
          })
        )
        .then(
          (writeResult: Readonly<WriteResult>): Promise<WriteResult> => {
            LoggerService.getInstance().success({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `Firebase guild ${ChalkService.getInstance().value(
                  guild.id
                )} created`
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
        filter((isReady: Readonly<boolean>): boolean =>
          _.isEqual(isReady, true)
        ),
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

  public watchGuilds(): void {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`watching Firebase guilds...`),
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
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `Firebase guilds watcher catch an error`
            ),
          });
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().error(error),
          });
        }
      );
    } else {
      throw new Error(`Collection not available`);
    }
  }

  private _setStore(): Promise<true> {
    return DiscordClientService.getInstance()
      .isReady()
      .then(
        (): Promise<true> => {
          this._store = firestore(FirebaseAppService.getInstance().getApp());
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
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `${ChalkService.getInstance().value(count)} guild${
              _.gt(count, 1) ? `s` : ``
            } found`
          ),
        });

        return Promise.resolve(count);
      }
    );
  }
}
