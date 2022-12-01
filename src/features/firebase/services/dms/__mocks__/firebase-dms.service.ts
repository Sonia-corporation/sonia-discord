import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { IFirebaseDm } from '../../../types/dms/firebase-dm';
import { CollectionReference } from 'firebase-admin/firestore';
import _ from 'lodash';

export class FirebaseDmsService extends AbstractService {
  private static _instance: FirebaseDmsService;

  public static getInstance(): FirebaseDmsService {
    if (_.isNil(FirebaseDmsService._instance)) {
      FirebaseDmsService._instance = new FirebaseDmsService();
    }

    return FirebaseDmsService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}

  public getCollectionReference(): CollectionReference<IFirebaseDm> | undefined {
    return undefined;
  }
}
