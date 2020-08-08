import admin from "firebase-admin";
import _ from "lodash";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { filter, map, mergeMap, take } from "rxjs/operators";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { DiscordClientService } from "../../discord/services/discord-client.service";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FIREBASE_GUILD_CURRENT_VERSION } from "../constants/firebase-guild-current-version";
import { handleFirebaseGuildBreakingChange } from "../functions/handle-firebase-guild-breaking-change";
import { isUpToDateFirebaseGuild } from "../functions/is-up-to-date-firebase-guild";
import { IFirebaseGuild } from "../types/firebase-guild";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import WriteBatch = admin.firestore.WriteBatch;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import WriteResult = admin.firestore.WriteResult;

export class FirebaseGuildsBreakingChangeService extends AbstractService {
  private static _instance: FirebaseGuildsBreakingChangeService;

  public static getInstance(): FirebaseGuildsBreakingChangeService {
    if (_.isNil(FirebaseGuildsBreakingChangeService._instance)) {
      FirebaseGuildsBreakingChangeService._instance = new FirebaseGuildsBreakingChangeService();
    }

    return FirebaseGuildsBreakingChangeService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _firebaseGuildsService: FirebaseGuildsService = FirebaseGuildsService.getInstance();
  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _hasFinished$: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

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
        filter((hasFinished: Readonly<boolean>): boolean => {
          return _.isEqual(hasFinished, true);
        }),
        take(1),
        map((): true => true)
      )
      .toPromise();
  }

  public notifyHasFinished(): void {
    this._hasFinished$.next(true);
  }

  public isReady$(): Observable<[true, true]> {
    return forkJoin([
      this._firebaseGuildsService.isReady(),
      this._discordClientService.isReady(),
    ]);
  }

  private _updateAllFirebaseGuilds$(): Observable<WriteResult[] | void> {
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `handle breaking changes for all Firebase guilds`
      ),
    });

    return this.isReady$().pipe(
      take(1),
      mergeMap(
        (): Promise<QuerySnapshot<IFirebaseGuild>> => {
          return this._firebaseGuildsService.getGuilds();
        }
      ),
      mergeMap(
        (
          querySnapshot: QuerySnapshot<IFirebaseGuild>
        ): Promise<WriteResult[] | void> => {
          return this._updateAllFirebaseGuilds(querySnapshot);
        }
      )
    );
  }

  private _updateAllFirebaseGuilds(
    querySnapshot: QuerySnapshot<IFirebaseGuild>
  ): Promise<WriteResult[] | void> {
    const batch:
      | WriteBatch
      | undefined = this._firebaseGuildsService.getBatch();

    if (!_.isNil(batch)) {
      let countFirebaseGuildsUpdated = 0;

      querySnapshot.forEach(
        (
          queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>
        ): void => {
          if (_.isEqual(queryDocumentSnapshot.exists, true)) {
            if (!isUpToDateFirebaseGuild(queryDocumentSnapshot.data())) {
              countFirebaseGuildsUpdated = _.add(countFirebaseGuildsUpdated, 1);
              batch.update(
                queryDocumentSnapshot.ref,
                handleFirebaseGuildBreakingChange(queryDocumentSnapshot.data())
              );
            }
          }
        }
      );

      if (_.gt(countFirebaseGuildsUpdated, 0)) {
        this._loggerService.debug({
          context: this._serviceName,
          message: this._chalkService.text(
            `updating ${this._chalkService.value(
              countFirebaseGuildsUpdated
            )} Firebase guild${
              _.gt(countFirebaseGuildsUpdated, 1) ? `s` : ``
            }...`
          ),
        });

        return batch.commit();
      }

      this._loggerService.log({
        context: this._serviceName,
        message: this._chalkService.text(
          `all Firebase guilds up-to-date ${this._chalkService.hint(
            `(v${FIREBASE_GUILD_CURRENT_VERSION})`
          )}`
        ),
      });

      return Promise.resolve();
    }

    this._loggerService.error({
      context: this._serviceName,
      message: this._chalkService.text(`Firebase guilds batch not available`),
    });

    return Promise.reject(new Error(`Firebase guilds batch not available`));
  }
}
