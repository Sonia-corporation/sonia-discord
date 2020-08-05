import _ from "lodash";
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

    this._watchFirebaseGuilds();
  }

  public addOrUpdateEntities(entities: IFirebaseGuild[]): void {
    this._firebaseGuildsStore.upsertMany(entities);
  }

  private _watchFirebaseGuilds(): void {
    this._firebaseGuildsService.onGuildsChange$().subscribe({
      next: (entities: IFirebaseGuild[]): void => {
        this.addOrUpdateEntities(entities);
        console.log(entities);
      },
    });
  }
}
