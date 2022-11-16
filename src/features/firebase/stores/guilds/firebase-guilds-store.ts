import { IFirebaseGuildState } from './types/firebase-guild-state';
import { AbstractEntityStoreService } from '../../../../classes/stores/abstract-entity-store.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { StoreNameEnum } from '../../../../enums/store-name.enum';
import { createStore, Store } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import _ from 'lodash';

export class FirebaseGuildsStore extends AbstractEntityStoreService {
  private static _instance: FirebaseGuildsStore;

  public static getInstance(): FirebaseGuildsStore {
    if (_.isNil(FirebaseGuildsStore._instance)) {
      FirebaseGuildsStore._instance = new FirebaseGuildsStore();
    }

    return FirebaseGuildsStore._instance;
  }

  public readonly store: Store = createStore({ name: StoreNameEnum.GUILDS }, withEntities<IFirebaseGuildState>());

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE);
  }
}
