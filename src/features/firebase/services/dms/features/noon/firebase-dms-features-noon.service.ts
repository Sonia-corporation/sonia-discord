import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { FIREBASE_DM_FEATURE_NOON_CURRENT_VERSION } from '../../../../constants/dms/features/firebase-dm-feature-noon-current-version';
import { INewFirebaseDmFeatureNoon } from '../../../../interfaces/dms/features/new-firebase-dm-feature-noon';
import { IFirebaseDmFeatureNoon } from '../../../../types/dms/features/firebase-dm-feature-noon';
import { IFirebaseDmFeatureNoonVFinal } from '../../../../types/dms/features/firebase-dm-feature-noon-v-final';
import { FirebaseUpdateCoreService } from '../../../firebase-update-core.service';
import _ from 'lodash';

export class FirebaseDmsFeaturesNoonService extends FirebaseUpdateCoreService<
  IFirebaseDmFeatureNoon,
  IFirebaseDmFeatureNoonVFinal,
  undefined,
  INewFirebaseDmFeatureNoon
> {
  private static _instance: FirebaseDmsFeaturesNoonService;

  public static getInstance(): FirebaseDmsFeaturesNoonService {
    if (_.isNil(FirebaseDmsFeaturesNoonService._instance)) {
      FirebaseDmsFeaturesNoonService._instance = new FirebaseDmsFeaturesNoonService();
    }

    return FirebaseDmsFeaturesNoonService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_FEATURES_NOON_SERVICE);
  }

  public isUpToDate(noon: IFirebaseDmFeatureNoon): noon is IFirebaseDmFeatureNoonVFinal {
    return _.isEqual(noon.version, FIREBASE_DM_FEATURE_NOON_CURRENT_VERSION);
  }

  public create(): INewFirebaseDmFeatureNoon {
    return {
      version: FIREBASE_DM_FEATURE_NOON_CURRENT_VERSION,
    };
  }

  public upgrade(noon: IFirebaseDmFeatureNoon): IFirebaseDmFeatureNoonVFinal {
    return noon;
  }
}
