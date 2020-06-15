import firebaseAdmin from "firebase-admin";
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
  private _database: firebaseAdmin.database.Database | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
  }

  public init(): void {
    this._database = firebaseAdmin.database(this._firebaseAppService.getApp());
    const ref: firebaseAdmin.database.Reference = this._database.ref(`/guilds`);

    ref.on(
      `value`,
      (snapshot: Readonly<firebaseAdmin.database.DataSnapshot>): void => {
        console.log(snapshot.val());
      },
      (errorObject: Readonly<Error>): void => {
        console.log(`The read failed: ` + errorObject.message);
      }
    );
  }
}
