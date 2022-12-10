import { FirebaseDmsService } from './firebase-dms.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_DM_CURRENT_VERSION } from '../../constants/dms/firebase-dm-current-version';
import { handleFirebaseDmBreakingChange } from '../../functions/dms/handle-firebase-dm-breaking-change';
import { isUpToDateFirebaseDm } from '../../functions/dms/is-up-to-date-firebase-dm';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';
import { QueryDocumentSnapshot, QuerySnapshot, WriteBatch, WriteResult } from 'firebase-admin/firestore';
import _ from 'lodash';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

const NO_DM = 0;
const ONE_DM = 1;

export class FirebaseDmsBreakingChangeService extends AbstractService {
  private static _instance: FirebaseDmsBreakingChangeService;

  public static getInstance(): FirebaseDmsBreakingChangeService {
    if (_.isNil(FirebaseDmsBreakingChangeService._instance)) {
      FirebaseDmsBreakingChangeService._instance = new FirebaseDmsBreakingChangeService();
    }

    return FirebaseDmsBreakingChangeService._instance;
  }

  private readonly _hasFinished$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_BREAKING_CHANGE_SERVICE);
  }

  public async init(): Promise<WriteResult[] | void> {
    await this._updateAllFirebaseDms();
    this.notifyHasFinished();
  }

  public hasFinished$(): Observable<boolean> {
    return this._hasFinished$.asObservable();
  }

  public hasFinished(): Promise<true> {
    return firstValueFrom(
      this.hasFinished$().pipe(
        filter((hasFinished: boolean): boolean => _.isEqual(hasFinished, true)),
        take(ONE_EMITTER),
        map((): true => true)
      )
    );
  }

  public notifyHasFinished(): void {
    this._hasFinished$.next(true);
  }

  private async _updateAllFirebaseDms(): Promise<WriteResult[] | void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`handling breaking changes for all Firebase DMs...`),
    });

    const querySnapshot: QuerySnapshot<IFirebaseDm> = await FirebaseDmsService.getInstance().getDms();

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`DMs fetched`),
    });

    const batch: WriteBatch | undefined = FirebaseDmsService.getInstance().getBatch();

    if (_.isNil(batch)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Firebase DMs batch not available`),
      });

      return Promise.reject(new Error(`Firebase DMs batch not available`));
    }

    let countFirebaseDmsUpdated = NO_DM;
    let countFirebaseDms = NO_DM;

    querySnapshot.forEach((queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseDm>): void => {
      if (_.isEqual(queryDocumentSnapshot.exists, true)) {
        countFirebaseDms = _.add(countFirebaseDms, ONE_DM);

        const firebaseDm: IFirebaseDm = queryDocumentSnapshot.data();

        if (!isUpToDateFirebaseDm(firebaseDm)) {
          countFirebaseDmsUpdated = _.add(countFirebaseDmsUpdated, ONE_DM);

          const updatedFirebaseDm: IFirebaseDmVFinal = handleFirebaseDmBreakingChange(firebaseDm);

          // TODO avoid casting
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          batch.update(queryDocumentSnapshot.ref, updatedFirebaseDm);
        }
      }
    });

    if (_.gte(countFirebaseDmsUpdated, ONE_DM)) {
      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `updating ${ChalkService.getInstance().value(countFirebaseDmsUpdated)} Firebase DM${
            _.gt(countFirebaseDmsUpdated, ONE_DM) ? `s` : ``
          }...`
        ),
      });

      return batch.commit();
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `all Firebase DM${_.gt(countFirebaseDms, ONE_DM) ? `s` : ``} ${ChalkService.getInstance().hint(
          `(${_.toString(countFirebaseDms)})`
        )} up-to-date ${ChalkService.getInstance().hint(`(v${_.toString(FIREBASE_DM_CURRENT_VERSION)})`)}`
      ),
    });

    return Promise.resolve();
  }
}
