import { Guild, Snowflake } from "discord.js";
import admin, { firestore } from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseCollectionEnum } from "../enums/firebase-collection.enum";
import { createFirebaseGuild } from "../functions/create-firebase-guild";
import { IFirebaseGuild } from "../interfaces/firebase-guild";
import { FirebaseAppService } from "./firebase-app.service";
import CollectionReference = admin.firestore.CollectionReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import Firestore = admin.firestore.Firestore;
import QuerySnapshot = admin.firestore.QuerySnapshot;
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
  private _store: Firestore | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
  }

  public init(): void {
    this._setStore();
    this._logGuildCount();
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
        .then((documentSnapshot: DocumentSnapshot<IFirebaseGuild>): boolean => {
          return documentSnapshot.exists;
        })
        .catch((): boolean => {
          return false;
        });
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  public addGuild(guild: Readonly<Guild>): Promise<WriteResult> {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      return collectionReference.doc(guild.id).set(
        createFirebaseGuild({
          id: guild.id,
        })
      );
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  private _setStore(): void {
    this._store = firestore(this._firebaseAppService.getApp());
  }

  private _logGuildCount(): Promise<number> {
    return this.getGuildsCount().then((count: Readonly<number>): number => {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(
          `${this._chalkService.value(count)} guild${
            _.gt(count, 1) ? `s` : ``
          } found`
        ),
      });

      return count;
    });
  }
}
