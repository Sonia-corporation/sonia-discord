import { FirebaseDmsFeaturesReleaseNotesService } from './firebase-dms-features-release-notes.service';
import { AbstractService } from '../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { flattenObject } from '../../../../../../functions/formatters/flatten-object';
import { IObject } from '../../../../../../types/object';
import { ChalkService } from '../../../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { isUpToDateFirebaseDm } from '../../../../functions/dms/is-up-to-date-firebase-dm';
import { IFirebaseDm } from '../../../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../../../types/dms/firebase-dm-v-final';
import { FirebaseDmsService } from '../../firebase-dms.service';
import { FirebaseDmsFeaturesService } from '../firebase-dms-features.service';
import { User } from 'discord.js';
import { CollectionReference, WriteResult } from 'firebase-admin/firestore';
import _ from 'lodash';

export class FirebaseDmsFeaturesReleaseNotesEnabledService extends AbstractService {
  private static _instance: FirebaseDmsFeaturesReleaseNotesEnabledService;

  public static getInstance(): FirebaseDmsFeaturesReleaseNotesEnabledService {
    if (_.isNil(FirebaseDmsFeaturesReleaseNotesEnabledService._instance)) {
      FirebaseDmsFeaturesReleaseNotesEnabledService._instance = new FirebaseDmsFeaturesReleaseNotesEnabledService();
    }

    return FirebaseDmsFeaturesReleaseNotesEnabledService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_FEATURES_RELEASE_NOTES_ENABLED_SERVICE);
  }

  public updateStateByDmId(id: User['id'], isEnabled: boolean): Promise<WriteResult | void> {
    const collectionReference: CollectionReference<IFirebaseDm> | undefined =
      FirebaseDmsService.getInstance().getCollectionReference();

    if (_.isNil(collectionReference)) {
      return Promise.reject(new Error(`Collection not available`));
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    this._logUpdatingStateStart();

    return FirebaseDmsService.getInstance()
      .getDm(id)
      .then((firebaseDm: IFirebaseDm | null | undefined): Promise<WriteResult> => {
        if (!this._isValidDm(firebaseDm)) {
          this._logInvalidFirebaseDm(id);

          return Promise.reject(new Error(`Firebase DM does not exists or is not up-to-date`));
        }

        return this.updateState(collectionReference, id, isEnabled, firebaseDm);
      });
  }

  /**
   * @description
   * Update the DM noon feature state.
   * @param   {boolean}           isEnabled  The new [enabled state]{@link IFirebaseDmVFinal#features#releaseNotes#isEnabled}.
   * @param   {IFirebaseDmVFinal} firebaseDm The current DM in the store.
   * @returns {IObject}                      A flatten object updating only the enabled state or a more complete object to also up-to-date the models.
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
   */
  public getUpdatedDm(isEnabled: boolean, firebaseDm: IFirebaseDmVFinal): IObject {
    if (!this._isDmFullyUpToDate(firebaseDm)) {
      this._logNotUpToDateFirebaseDm(firebaseDm.id);

      return this._getUpdatedDm(isEnabled, firebaseDm);
    }

    this._logFullyUpToDateFirebaseDm(firebaseDm.id);

    return this._getUpdatedDmWithPathOnly(isEnabled);
  }

  public updateState(
    collectionReference: CollectionReference<IFirebaseDm>,
    id: User['id'],
    isEnabled: boolean,
    firebaseDm: IFirebaseDmVFinal
  ): Promise<WriteResult> {
    return collectionReference
      .doc(id)
      .update(this.getUpdatedDm(isEnabled, firebaseDm))
      .then((writeResult: WriteResult): Promise<WriteResult> => {
        this._logUpdateStateSuccess(id, isEnabled);

        return Promise.resolve(writeResult);
      });
  }

  private _isDmFullyUpToDate(firebaseDm: IFirebaseDmVFinal): boolean {
    return this._isValidFeature(firebaseDm) && this._isValidReleaseNotesFeature(firebaseDm);
  }

  private _isValidFeature(firebaseDm: IFirebaseDmVFinal): boolean {
    return FirebaseDmsFeaturesService.getInstance().isValid(firebaseDm.features);
  }

  private _isValidReleaseNotesFeature(firebaseDm: IFirebaseDmVFinal): boolean {
    return FirebaseDmsFeaturesReleaseNotesService.getInstance().isValid(firebaseDm.features?.releaseNotes);
  }

  private _getUpdatedDm(isEnabled: boolean, firebaseDm: IFirebaseDmVFinal): IObject {
    firebaseDm.features = FirebaseDmsFeaturesService.getInstance().getUpToDate(firebaseDm.features);
    firebaseDm.features.releaseNotes = FirebaseDmsFeaturesReleaseNotesService.getInstance().getUpToDate(
      firebaseDm.features.releaseNotes
    );
    firebaseDm.features.releaseNotes.isEnabled = isEnabled;

    /**
     * @description
     * TODO remove the spread once TS handle this properly.
     * @see Https://github.com/microsoft/TypeScript/issues/15300#issuecomment-436793742 for the destructuring part.
     */
    return flattenObject({ ...firebaseDm });
  }

  /**
   * @description
   * Update the state of the release notes feature to either disable or enable it.
   * Then return updated object.
   * @param   {boolean} isEnabled The new [enabled state]{@link IFirebaseDmVFinal#features#releaseNotes#isEnabled}.
   * @returns {IObject}           A flatten object updating only the enabled state.
   * @private
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
   */
  private _getUpdatedDmWithPathOnly(isEnabled: boolean): IObject {
    const flattenFirebaseDm: IObject = {};

    _.set(flattenFirebaseDm, `features.releaseNotes.isEnabled`, isEnabled);

    return flattenObject(flattenFirebaseDm);
  }

  private _logUpdatingStateStart(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`updating Firebase DM release notes feature enabled state...`),
    });
  }

  private _isValidDm(firebaseDm: IFirebaseDm | null | undefined): firebaseDm is IFirebaseDmVFinal {
    return !_.isNil(firebaseDm) && isUpToDateFirebaseDm(firebaseDm);
  }

  private _logUpdateStateSuccess(id: User['id'], isEnabled: boolean): void {
    LoggerService.getInstance().success({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase DM ${ChalkService.getInstance().value(
          id
        )} release notes feature enabled state updated to ${ChalkService.getInstance().value(isEnabled)}`
      ),
    });
  }

  private _logInvalidFirebaseDm(id: User['id']): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `the Firebase DM ${ChalkService.getInstance().value(id)} is not valid or up-to-date`
      ),
    });
  }

  private _logFullyUpToDateFirebaseDm(id: User['id'] | undefined): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase DM ${ChalkService.getInstance().value(_.toString(id))} is up-to-date`
      ),
    });
  }

  private _logNotUpToDateFirebaseDm(id: User['id'] | undefined): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase DM ${ChalkService.getInstance().value(_.toString(id))} is not up-to-date`
      ),
    });
  }
}
