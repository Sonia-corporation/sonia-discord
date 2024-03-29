import { FirebaseGuildsService } from './firebase-guilds.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerFirebaseService } from '../../../logger/services/logger-firebase.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_GUILD_CURRENT_VERSION } from '../../constants/guilds/firebase-guild-current-version';
import { handleFirebaseGuildBreakingChange } from '../../functions/guilds/handle-firebase-guild-breaking-change';
import { isUpToDateFirebaseGuild } from '../../functions/guilds/is-up-to-date-firebase-guild';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import { QueryDocumentSnapshot, QuerySnapshot, WriteBatch, WriteResult } from 'firebase-admin/firestore';
import _ from 'lodash';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

const NO_GUILD = 0;
const ONE_GUILD = 1;

export class FirebaseGuildsBreakingChangeService extends AbstractService {
  private static _instance: FirebaseGuildsBreakingChangeService;

  public static getInstance(): FirebaseGuildsBreakingChangeService {
    if (_.isNil(FirebaseGuildsBreakingChangeService._instance)) {
      FirebaseGuildsBreakingChangeService._instance = new FirebaseGuildsBreakingChangeService();
    }

    return FirebaseGuildsBreakingChangeService._instance;
  }

  private readonly _hasFinished$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_BREAKING_CHANGE_SERVICE);
  }

  public async init(): Promise<WriteResult[] | void> {
    await this._updateAllFirebaseGuilds();

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

  private async _updateAllFirebaseGuilds(): Promise<WriteResult[] | void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`handling breaking changes for all Firebase guilds...`),
    });

    const querySnapshot: QuerySnapshot<IFirebaseGuild> = await FirebaseGuildsService.getInstance().getGuilds();

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`guilds fetched`),
    });

    const batch: WriteBatch | undefined = FirebaseGuildsService.getInstance().getBatch();

    if (_.isNil(batch)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Firebase guilds batch not available`),
      });

      return Promise.reject(new Error(`Firebase guilds batch not available`));
    }

    let countFirebaseGuildsUpdated = NO_GUILD;
    let countFirebaseGuilds = NO_GUILD;

    querySnapshot.forEach((queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>): void => {
      if (_.isEqual(queryDocumentSnapshot.exists, true)) {
        countFirebaseGuilds = _.add(countFirebaseGuilds, ONE_GUILD);

        const firebaseGuild: IFirebaseGuild = queryDocumentSnapshot.data();

        if (!isUpToDateFirebaseGuild(firebaseGuild)) {
          countFirebaseGuildsUpdated = _.add(countFirebaseGuildsUpdated, ONE_GUILD);

          const updatedFirebaseGuild: IFirebaseGuildVFinal = handleFirebaseGuildBreakingChange(firebaseGuild);

          // TODO avoid casting
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          batch.update(queryDocumentSnapshot.ref, updatedFirebaseGuild);
        }
      }
    });

    if (_.gte(countFirebaseGuildsUpdated, ONE_GUILD)) {
      LoggerFirebaseService.getInstance().logGuildsToUpdateCount(this._serviceName, countFirebaseGuildsUpdated);

      return batch.commit();
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `all Firebase guild${_.gt(countFirebaseGuilds, ONE_GUILD) ? `s` : ``} ${ChalkService.getInstance().hint(
          `(${_.toString(countFirebaseGuilds)})`
        )} up-to-date ${ChalkService.getInstance().hint(`(v${_.toString(FIREBASE_GUILD_CURRENT_VERSION)})`)}`
      ),
    });

    return Promise.resolve();
  }
}
