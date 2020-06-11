import firebaseAdmin from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";

export class FirebaseAuthenticationService extends AbstractService {
  private static _instance: FirebaseAuthenticationService;

  public static getInstance(): FirebaseAuthenticationService {
    if (_.isNil(FirebaseAuthenticationService._instance)) {
      FirebaseAuthenticationService._instance = new FirebaseAuthenticationService();
    }

    return FirebaseAuthenticationService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_AUTHENTICATION_SERVICE);
  }

  public init(): void {
    this._initializeFirebaseApp();
  }

  private _initializeFirebaseApp(): void {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(``),
      databaseURL: `https://sonia-il-est-midi-discord-api.firebaseio.com`,
    });
  }
}
