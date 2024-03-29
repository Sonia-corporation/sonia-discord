import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { IFirebaseGuild } from '../../../types/guilds/firebase-guild';
import { CollectionReference } from 'firebase-admin/firestore';
import _ from 'lodash';

export class FirebaseGuildsService extends AbstractService {
  private static _instance: FirebaseGuildsService;

  public static getInstance(): FirebaseGuildsService {
    if (_.isNil(FirebaseGuildsService._instance)) {
      FirebaseGuildsService._instance = new FirebaseGuildsService();
    }

    return FirebaseGuildsService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}

  public getCollectionReference(): CollectionReference<IFirebaseGuild> | undefined {
    return undefined;
  }
}
