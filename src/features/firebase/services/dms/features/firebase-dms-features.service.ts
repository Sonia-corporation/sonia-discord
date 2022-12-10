import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { FIREBASE_DM_FEATURE_CURRENT_VERSION } from '../../../constants/dms/features/firebase-dm-feature-current-version';
import { handleFirebaseDmFeatureBreakingChange } from '../../../functions/dms/features/handle-firebase-dm-feature-breaking-change';
import { INewFirebaseDmFeature } from '../../../interfaces/dms/features/new-firebase-dm-feature';
import { IFirebaseDmFeature } from '../../../types/dms/features/firebase-dm-feature';
import { IFirebaseDmFeatureVFinal } from '../../../types/dms/features/firebase-dm-feature-v-final';
import { FirebaseUpdateCoreService } from '../../firebase-update-core.service';
import _ from 'lodash';

export class FirebaseDmsFeaturesService extends FirebaseUpdateCoreService<
  IFirebaseDmFeature,
  IFirebaseDmFeatureVFinal,
  undefined,
  INewFirebaseDmFeature
> {
  private static _instance: FirebaseDmsFeaturesService;

  public static getInstance(): FirebaseDmsFeaturesService {
    if (_.isNil(FirebaseDmsFeaturesService._instance)) {
      FirebaseDmsFeaturesService._instance = new FirebaseDmsFeaturesService();
    }

    return FirebaseDmsFeaturesService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_FEATURES_SERVICE);
  }

  public isUpToDate(feature: IFirebaseDmFeature): feature is IFirebaseDmFeatureVFinal {
    return _.isEqual(feature.version, FIREBASE_DM_FEATURE_CURRENT_VERSION);
  }

  public create(): INewFirebaseDmFeature {
    return {
      version: FIREBASE_DM_FEATURE_CURRENT_VERSION,
    };
  }

  public upgrade(feature: IFirebaseDmFeature): IFirebaseDmFeatureVFinal {
    return handleFirebaseDmFeatureBreakingChange(feature);
  }
}
