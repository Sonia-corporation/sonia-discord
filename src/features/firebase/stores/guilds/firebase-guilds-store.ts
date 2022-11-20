import { IFirebaseGuildState } from './types/firebase-guild-state';
import { AbstractEntityStoreService } from '../../../../classes/stores/abstract-entity-store.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { StoreNameEnum } from '../../../../enums/store-name.enum';
import { createStore, Query, Store } from '@ngneat/elf';
import { EntitiesRef, EntitiesState, withEntities } from '@ngneat/elf-entities';
import { Reducer } from '@ngneat/elf/lib/store';
import _ from 'lodash';

export class FirebaseGuildsStore extends AbstractEntityStoreService {
  private static _instance: FirebaseGuildsStore;

  public static getInstance(): FirebaseGuildsStore {
    if (_.isNil(FirebaseGuildsStore._instance)) {
      FirebaseGuildsStore._instance = new FirebaseGuildsStore();
    }

    return FirebaseGuildsStore._instance;
  }

  protected readonly _store$: Store = createStore({ name: StoreNameEnum.GUILDS }, withEntities<IFirebaseGuildState>());

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE);
  }

  update(...reducers: Reducer<EntitiesState<EntitiesRef<'entities', 'ids', 'idKey'>>>[]): void {
    this._store$.update(...reducers);
  }

  query<TR>(selector: Query<EntitiesState<EntitiesRef<'entities', 'ids', 'idKey'>>, TR>): TR {
    return this._store$.query(selector);
  }
}
