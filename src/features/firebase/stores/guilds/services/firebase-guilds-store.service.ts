import _ from "lodash";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
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

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE_SERVICE);
  }
}
