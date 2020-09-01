import { StoreConfig } from "@datorama/akita";
import _ from "lodash";
import { AbstractEntityStoreService } from "../../../../classes/stores/abstract-entity-store.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { StoreNameEnum } from "../../../../enums/store-name.enum";
import { IFirebaseGuildState } from "./types/firebase-guild-state";

@StoreConfig({
  idKey: `id`,
  name: StoreNameEnum.GUILDS,
})
export class FirebaseGuildsStore extends AbstractEntityStoreService<
  IFirebaseGuildState
> {
  private static _instance: FirebaseGuildsStore;

  public static getInstance(): FirebaseGuildsStore {
    if (_.isNil(FirebaseGuildsStore._instance)) {
      FirebaseGuildsStore._instance = new FirebaseGuildsStore();
    }

    return FirebaseGuildsStore._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE);
  }
}
