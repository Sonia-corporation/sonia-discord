import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { FirebaseAppEnum } from '../enums/firebase-app.enum';
import { App, applicationDefault, initializeApp } from 'firebase-admin/app';
import _ from 'lodash';

export class FirebaseAppService extends AbstractService {
  private static _instance: FirebaseAppService;

  public static getInstance(): FirebaseAppService {
    if (_.isNil(FirebaseAppService._instance)) {
      FirebaseAppService._instance = new FirebaseAppService();
    }

    return FirebaseAppService._instance;
  }

  private _app: App | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.FIREBASE_APP_SERVICE);
  }

  public init(): void {
    this._initializeFirebaseApp();
  }

  public getApp(): App | undefined {
    return this._app;
  }

  private _initializeFirebaseApp(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`creating app...`),
    });

    this._app = initializeApp(
      {
        credential: applicationDefault(),
        databaseURL: `https://sonia-discord-api.firebaseio.com`,
      },
      FirebaseAppEnum.SONIA_DISCORD
    );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`app created`),
    });
  }
}
