import { applyTransaction } from "@datorama/akita";
import _ from "lodash";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { IFirebaseGuild } from "../../../interfaces/firebase-guild";
import { FirebaseGuildsService } from "../../../services/firebase-guilds.service";
import { FirebaseGuildsStore } from "../firebase-guilds-store";

export class FirebaseGuildsStoreService extends AbstractService {
  private static _instance: FirebaseGuildsStoreService;

  public static getInstance(): FirebaseGuildsStoreService {
    if (_.isNil(FirebaseGuildsStoreService._instance)) {
      FirebaseGuildsStoreService._instance = new FirebaseGuildsStoreService();
    }

    return FirebaseGuildsStoreService._instance;
  }

  private readonly _firebaseGuildsStore: FirebaseGuildsStore = FirebaseGuildsStore.getInstance();
  private readonly _firebaseGuildsService: FirebaseGuildsService = FirebaseGuildsService.getInstance();

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE_SERVICE);
  }

  public init(): void {
    this._watchFirebaseGuilds$().subscribe();
  }

  public addOrUpdateEntities(entities: IFirebaseGuild[]): void {
    this._firebaseGuildsStore.upsertMany(entities);
  }

  public addEntities(entities: IFirebaseGuild[]): void {
    this._firebaseGuildsStore.add(entities);
  }

  public removeAllEntities(): void {
    this._firebaseGuildsStore.remove();
  }

  private _watchFirebaseGuilds$(): Observable<IFirebaseGuild[]> {
    return this._firebaseGuildsService.onGuildsChange$().pipe(
      tap({
        next: (entities: IFirebaseGuild[]): void => {
          applyTransaction((): void => {
            this.removeAllEntities();
            this.addEntities(entities);
          });
        },
      })
    );
  }
}
