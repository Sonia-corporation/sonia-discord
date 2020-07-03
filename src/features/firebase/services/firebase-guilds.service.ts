import admin, { firestore } from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseCollectionEnum } from "../enums/firebase-collection.enum";
import { FirebaseAppService } from "./firebase-app.service";
import CollectionReference = admin.firestore.CollectionReference;
import DocumentData = admin.firestore.DocumentData;
import Firestore = admin.firestore.Firestore;
import QuerySnapshot = admin.firestore.QuerySnapshot;

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
    | CollectionReference<DocumentData>
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

  private _setStore(): void {
    this._store = firestore(this._firebaseAppService.getApp());
  }

  private _logGuildCount(): Promise<QuerySnapshot<DocumentData>> {
    const collectionReference:
      | CollectionReference<DocumentData>
      | undefined = this.getCollectionReference();

    if (!_.isNil(collectionReference)) {
      return collectionReference.get().then(
        (
          querySnapshot: QuerySnapshot<DocumentData>
        ): QuerySnapshot<DocumentData> => {
          this._loggerService.debug({
            context: this._serviceName,
            message: this._chalkService.text(
              `${querySnapshot.size} guilds found`
            ),
          });

          return querySnapshot;
        }
      );
    }

    return Promise.reject(new Error(`Collection not available`));
  }
}
