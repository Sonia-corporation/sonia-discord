import admin, { initializeApp } from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseAppEnum } from "../enums/firebase-app.enum";
import App = admin.app.App;
import applicationDefault = admin.credential.applicationDefault;

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
  private _app: App | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_APP_SERVICE);
  }

  public init(): void {
    this._checkGoogleApplicationCredentials();
    this._logGoogleApplicationCredentials();
    this._initializeFirebaseApp();
  }

  public getApp(): App | undefined {
    return this._app;
  }

  private _checkGoogleApplicationCredentials(): void | never {
    if (_.isNil(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
      this._loggerService.error({
        context: this._serviceName,
        message: this._chalkService.text(
          `This error should not happen. If everything is as expected this is not related to the current developer environment and it means that a breaking change happened.`
        ),
      });

      throw new Error(`GOOGLE_APPLICATION_CREDENTIALS env is undefined`);
    }
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

    this._app = initializeApp(
      {
        credential: applicationDefault(),
        databaseURL: `https://sonia-il-est-midi-discord-api.firebaseio.com`,
      },
      FirebaseAppEnum.SONIA_IL_EST_MIDI_DISCORD
    );

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`app created`),
    });
  }
}
