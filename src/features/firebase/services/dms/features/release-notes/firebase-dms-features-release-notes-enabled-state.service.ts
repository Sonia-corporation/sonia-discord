import { FirebaseDmsFeaturesReleaseNotesService } from './firebase-dms-features-release-notes.service';
import { AbstractService } from '../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { ChalkService } from '../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { IFirebaseDmFeatureReleaseNotesVFinal } from '../../../../types/dms/features/firebase-dm-feature-release-notes-v-final';
import { IFirebaseDmVFinal } from '../../../../types/dms/firebase-dm-v-final';
import { FirebaseDmsFeaturesService } from '../firebase-dms-features.service';
import _ from 'lodash';

export class FirebaseDmsFeaturesReleaseNotesEnabledStateService extends AbstractService {
  private static _instance: FirebaseDmsFeaturesReleaseNotesEnabledStateService;

  public static getInstance(): FirebaseDmsFeaturesReleaseNotesEnabledStateService {
    if (_.isNil(FirebaseDmsFeaturesReleaseNotesEnabledStateService._instance)) {
      FirebaseDmsFeaturesReleaseNotesEnabledStateService._instance =
        new FirebaseDmsFeaturesReleaseNotesEnabledStateService();
    }

    return FirebaseDmsFeaturesReleaseNotesEnabledStateService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_FEATURES_RELEASE_NOTES_ENABLED_STATE_SERVICE);
  }

  public isEnabled(firebaseDm: IFirebaseDmVFinal): boolean {
    if (!this._isValidFeature(firebaseDm)) {
      return false;
    }

    if (!this._isValidReleaseNotesFeature(firebaseDm)) {
      return false;
    }

    return firebaseDm.features?.releaseNotes?.isEnabled ?? false;
  }

  private _isValidFeature(firebaseDm: IFirebaseDmVFinal): boolean {
    const { features } = firebaseDm;

    if (!FirebaseDmsFeaturesService.getInstance().isSet(features)) {
      this._logFeaturesNotSet(firebaseDm);

      return false;
    }

    if (!FirebaseDmsFeaturesService.getInstance().isUpToDate(features)) {
      this._logFeaturesNotUpToDate(firebaseDm);

      return false;
    }

    return true;
  }

  private _isValidReleaseNotesFeature(firebaseDm: IFirebaseDmVFinal): boolean {
    const releaseNotes: IFirebaseDmFeatureReleaseNotesVFinal | undefined = firebaseDm.features?.releaseNotes;

    if (!FirebaseDmsFeaturesReleaseNotesService.getInstance().isSet(releaseNotes)) {
      this._logReleaseNotesNotSet(firebaseDm);

      return false;
    }

    if (!FirebaseDmsFeaturesReleaseNotesService.getInstance().isUpToDate(releaseNotes)) {
      this._logReleaseNotesNotUpToDate(firebaseDm);

      return false;
    }

    return true;
  }

  private _logFeaturesNotUpToDate(firebaseDm: IFirebaseDmVFinal): void {
    this._logNotUpToDate(firebaseDm, `features`);
  }

  private _logFeaturesNotSet(firebaseDm: IFirebaseDmVFinal): void {
    this._logNotSet(firebaseDm, `features`);
  }

  private _logReleaseNotesNotUpToDate(firebaseDm: IFirebaseDmVFinal): void {
    this._logNotUpToDate(firebaseDm, `release notes feature`);
  }

  private _logReleaseNotesNotSet(firebaseDm: IFirebaseDmVFinal): void {
    this._logNotSet(firebaseDm, `release notes feature`);
  }

  private _logNotUpToDate(firebaseDm: IFirebaseDmVFinal, entity?: string | undefined): void {
    this._logNot(firebaseDm, entity, `up-to-date`);
  }

  private _logNotSet(firebaseDm: IFirebaseDmVFinal, entity?: string | undefined): void {
    this._logNot(firebaseDm, entity, `set`);
  }

  private _logNot(firebaseDm: IFirebaseDmVFinal, entity: string | undefined, type: string): void {
    let message = `not ${type}`;

    if (!_.isNil(entity)) {
      message = `${entity} ${message}`;
    }

    this._log(firebaseDm, message);
  }

  private _log({ id }: IFirebaseDmVFinal, message: string): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase DM ${ChalkService.getInstance().value(id)} ${message}`),
    });
  }
}
