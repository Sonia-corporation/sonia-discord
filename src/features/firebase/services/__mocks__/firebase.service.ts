import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import _ from 'lodash';

export class FirebaseService extends AbstractService {
  private static _instance: FirebaseService;

  public static getInstance(): FirebaseService {
    if (_.isNil(FirebaseService._instance)) {
      FirebaseService._instance = new FirebaseService();
    }

    return FirebaseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}
}
