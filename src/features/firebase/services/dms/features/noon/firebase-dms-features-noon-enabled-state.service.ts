import { FirebaseDmsFeaturesNoonService } from './firebase-dms-features-noon.service';
import { AbstractService } from '../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { ChalkService } from '../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { IFirebaseDmFeatureNoonVFinal } from '../../../../types/dms/features/firebase-dm-feature-noon-v-final';
import { IFirebaseDmVFinal } from '../../../../types/dms/firebase-dm-v-final';
import { FirebaseDmsFeaturesService } from '../firebase-dms-features.service';
import _ from 'lodash';

export class FirebaseDmsFeaturesNoonEnabledStateService extends AbstractService {
  private static _instance: FirebaseDmsFeaturesNoonEnabledStateService;

  public static getInstance(): FirebaseDmsFeaturesNoonEnabledStateService {
    if (_.isNil(FirebaseDmsFeaturesNoonEnabledStateService._instance)) {
      FirebaseDmsFeaturesNoonEnabledStateService._instance = new FirebaseDmsFeaturesNoonEnabledStateService();
    }

    return FirebaseDmsFeaturesNoonEnabledStateService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_FEATURES_NOON_ENABLED_STATE_SERVICE);
  }

  public isEnabled(firebaseDm: IFirebaseDmVFinal): boolean {
    if (!this._isValidFeature(firebaseDm)) {
      return false;
    }

    if (!this._isValidNoonFeature(firebaseDm)) {
      return false;
    }

    return firebaseDm?.features?.noon?.isEnabled ?? false;
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

  private _isValidNoonFeature(firebaseDm: IFirebaseDmVFinal): boolean {
    const noon: IFirebaseDmFeatureNoonVFinal | undefined = firebaseDm.features?.noon;

    if (!FirebaseDmsFeaturesNoonService.getInstance().isSet(noon)) {
      this._logNoonNotSet(firebaseDm);

      return false;
    }

    if (!FirebaseDmsFeaturesNoonService.getInstance().isUpToDate(noon)) {
      this._logNoonNotUpToDate(firebaseDm);

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

  private _logNoonNotUpToDate(firebaseDm: IFirebaseDmVFinal): void {
    this._logNotUpToDate(firebaseDm, `noon feature`);
  }

  private _logNoonNotSet(firebaseDm: IFirebaseDmVFinal): void {
    this._logNotSet(firebaseDm, `noon feature`);
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
