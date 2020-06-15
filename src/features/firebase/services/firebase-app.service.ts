import firebaseAdmin from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseAppEnum } from "../enums/firebase-app.enum";

export class FirebaseAppService extends AbstractService {
  private static _instance: FirebaseAppService;

  public static getInstance(): FirebaseAppService {
    if (_.isNil(FirebaseAppService._instance)) {
      FirebaseAppService._instance = new FirebaseAppService();
    }

    return FirebaseAppService._instance;
  }

  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private _app: firebaseAdmin.app.App | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_APP_SERVICE);
  }

  public init(): void {
    this._logGoogleApplicationCredentials();
    this._initializeFirebaseApp();
  }

  public getApp(): firebaseAdmin.app.App | undefined {
    return this._app;
  }

  private _logGoogleApplicationCredentials(): void {
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `GOOGLE_APPLICATION_CREDENTIALS env: ${this._chalkService.value(
          process.env.GOOGLE_APPLICATION_CREDENTIALS
        )}`
      ),
    });
  }

  private _initializeFirebaseApp(): void {
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`creating app...`),
    });

    this._app = firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.applicationDefault(),
        databaseURL: `https://sonia-il-est-midi-discord-api.firebaseio.com`,
      },
      FirebaseAppEnum.SONIA_IL_EST_MIDI_DISCORD
    );

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`app`),
    });
  }
}
