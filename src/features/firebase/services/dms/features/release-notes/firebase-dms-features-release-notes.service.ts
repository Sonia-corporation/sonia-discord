import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { FIREBASE_DM_FEATURE_RELEASE_NOTES_CURRENT_VERSION } from '../../../../constants/dms/features/firebase-dm-feature-release-notes-current-version';
import { INewFirebaseDmFeatureReleaseNotes } from '../../../../interfaces/dms/features/new-firebase-dm-feature-release-notes';
import { IFirebaseDmFeatureReleaseNotes } from '../../../../types/dms/features/firebase-dm-feature-release-notes';
import { IFirebaseDmFeatureReleaseNotesVFinal } from '../../../../types/dms/features/firebase-dm-feature-release-notes-v-final';
import { FirebaseUpdateCoreService } from '../../../firebase-update-core.service';
import _ from 'lodash';

export class FirebaseDmsFeaturesReleaseNotesService extends FirebaseUpdateCoreService<
  IFirebaseDmFeatureReleaseNotes,
  IFirebaseDmFeatureReleaseNotesVFinal,
  undefined,
  INewFirebaseDmFeatureReleaseNotes
> {
  private static _instance: FirebaseDmsFeaturesReleaseNotesService;

  public static getInstance(): FirebaseDmsFeaturesReleaseNotesService {
    if (_.isNil(FirebaseDmsFeaturesReleaseNotesService._instance)) {
      FirebaseDmsFeaturesReleaseNotesService._instance = new FirebaseDmsFeaturesReleaseNotesService();
    }

    return FirebaseDmsFeaturesReleaseNotesService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_FEATURES_RELEASE_NOTES_SERVICE);
  }

  public isUpToDate(
    releaseNotes: IFirebaseDmFeatureReleaseNotes
  ): releaseNotes is IFirebaseDmFeatureReleaseNotesVFinal {
    return _.isEqual(releaseNotes.version, FIREBASE_DM_FEATURE_RELEASE_NOTES_CURRENT_VERSION);
  }

  public create(): INewFirebaseDmFeatureReleaseNotes {
    return {
      version: FIREBASE_DM_FEATURE_RELEASE_NOTES_CURRENT_VERSION,
    };
  }

  public upgrade(releaseNotes: IFirebaseDmFeatureReleaseNotes): IFirebaseDmFeatureReleaseNotesVFinal {
    return releaseNotes;
  }
}
