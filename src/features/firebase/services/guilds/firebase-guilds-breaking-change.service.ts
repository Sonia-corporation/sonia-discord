import { FirebaseGuildsService } from './firebase-guilds.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { DiscordClientService } from '../../../discord/services/discord-client.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_GUILD_CURRENT_VERSION } from '../../constants/guilds/firebase-guild-current-version';
import { handleFirebaseGuildBreakingChange } from '../../functions/guilds/handle-firebase-guild-breaking-change';
import { isUpToDateFirebaseGuild } from '../../functions/guilds/is-up-to-date-firebase-guild';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import admin from 'firebase-admin';
import _ from 'lodash';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import WriteBatch = admin.firestore.WriteBatch;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import WriteResult = admin.firestore.WriteResult;

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

  public init(): Promise<WriteResult[] | void> {
    return this._updateAllFirebaseGuilds$()
      .toPromise()
      .then((): void => {
        this.notifyHasFinished();
      });
  }

  public hasFinished$(): Observable<boolean> {
    return this._hasFinished$.asObservable();
  }

  public hasFinished(): Promise<true> {
    return this.hasFinished$()
      .pipe(
        filter((hasFinished: Readonly<boolean>): boolean => _.isEqual(hasFinished, true)),
        take(ONE_EMITTER),
        map((): true => true)
      )
      .toPromise();
  }

  public notifyHasFinished(): void {
    this._hasFinished$.next(true);
  }

  public isReady$(): Observable<[true, true]> {
    return forkJoin([FirebaseGuildsService.getInstance().isReady(), DiscordClientService.getInstance().isReady()]);
  }

  private _updateAllFirebaseGuilds$(): Observable<WriteResult[] | void> {
    return this.isReady$().pipe(
      take(ONE_EMITTER),
      tap({
        next: (): void => {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`handling breaking changes for all Firebase guilds...`),
          });
        },
      }),
      mergeMap((): Promise<QuerySnapshot<IFirebaseGuild>> => FirebaseGuildsService.getInstance().getGuilds()),
      mergeMap(
        (querySnapshot: QuerySnapshot<IFirebaseGuild>): Promise<WriteResult[] | void> => {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`guilds fetched`),
          });

          return this._updateAllFirebaseGuilds(querySnapshot);
        }
      )
    );
  }

  private _updateAllFirebaseGuilds(querySnapshot: QuerySnapshot<IFirebaseGuild>): Promise<WriteResult[] | void> {
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

        if (!isUpToDateFirebaseGuild(queryDocumentSnapshot.data())) {
          countFirebaseGuildsUpdated = _.add(countFirebaseGuildsUpdated, ONE_GUILD);
          batch.update(queryDocumentSnapshot.ref, handleFirebaseGuildBreakingChange(queryDocumentSnapshot.data()));
        }
      }
    });

    if (_.gte(countFirebaseGuildsUpdated, ONE_GUILD)) {
      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `updating ${ChalkService.getInstance().value(countFirebaseGuildsUpdated)} Firebase guild${
            _.gt(countFirebaseGuildsUpdated, ONE_GUILD) ? `s` : ``
          }...`
        ),
      });

      return batch.commit();
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `all Firebase guild${_.gt(countFirebaseGuilds, ONE_GUILD) ? `s` : ``} ${ChalkService.getInstance().hint(
          `(${countFirebaseGuilds})`
        )} up-to-date ${ChalkService.getInstance().hint(`(v${FIREBASE_GUILD_CURRENT_VERSION})`)}`
      ),
    });

    return Promise.resolve();
  }
}
