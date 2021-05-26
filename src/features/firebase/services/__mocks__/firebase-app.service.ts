import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import admin from 'firebase-admin';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

export class FirebaseAppService extends AbstractService {
  private static _instance: FirebaseAppService;

  public static getInstance(): FirebaseAppService {
    if (_.isNil(FirebaseAppService._instance)) {
      FirebaseAppService._instance = new FirebaseAppService();
    }

    return FirebaseAppService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_APP_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}

  public getApp(): admin.app.App | undefined {
    return createHydratedMock<admin.app.App>();
  }
}
