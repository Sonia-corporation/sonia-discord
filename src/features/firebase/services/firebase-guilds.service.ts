import admin from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { FirebaseAppService } from "./firebase-app.service";

export class FirebaseGuildsService extends AbstractService {
  private static _instance: FirebaseGuildsService;

  public static getInstance(): FirebaseGuildsService {
    if (_.isNil(FirebaseGuildsService._instance)) {
      FirebaseGuildsService._instance = new FirebaseGuildsService();
    }

    return FirebaseGuildsService._instance;
  }

  private readonly _firebaseAppService: FirebaseAppService = FirebaseAppService.getInstance();
  private _store: admin.firestore.Firestore | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
  }

  public init(): void {
    this._setDatabase();
    const collectionReference:
      | admin.firestore.CollectionReference<admin.firestore.DocumentData>
      | undefined = this._store?.collection(`/guilds`);

    collectionReference
      ?.get()
      .then(
        (
          querySnapshot: admin.firestore.QuerySnapshot<
            admin.firestore.DocumentData
          >
        ): void => {
          querySnapshot.forEach(
            (
              queryDocumentSnapshot: Readonly<
                admin.firestore.QueryDocumentSnapshot
              >
            ): void => {
              console.log(queryDocumentSnapshot.id);
            }
          );
        }
      );
  }

  private _setDatabase(): void {
    this._store = admin.firestore(this._firebaseAppService.getApp());
  }
}
