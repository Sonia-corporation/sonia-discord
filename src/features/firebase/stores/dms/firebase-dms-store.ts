import { IFirebaseDmState } from './types/firebase-dm-state';
import { AbstractEntityStoreService } from '../../../../classes/stores/abstract-entity-store.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { StoreNameEnum } from '../../../../enums/store-name.enum';
import { createStore, Query, Store } from '@ngneat/elf';
import { EntitiesRef, EntitiesState, withEntities } from '@ngneat/elf-entities';
import { Reducer } from '@ngneat/elf/lib/store';
import _ from 'lodash';

export class FirebaseDmsStore extends AbstractEntityStoreService {
  private static _instance: FirebaseDmsStore;

  public static getInstance(): FirebaseDmsStore {
    if (_.isNil(FirebaseDmsStore._instance)) {
      FirebaseDmsStore._instance = new FirebaseDmsStore();
    }

    return FirebaseDmsStore._instance;
  }

  // eslint-disable-next-line rxjs/no-exposed-subjects
  public override readonly store$: Store = createStore({ name: StoreNameEnum.DMS }, withEntities<IFirebaseDmState>());

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_STORE);
  }

  update(...reducers: Reducer<EntitiesState<EntitiesRef<'entities', 'ids', 'idKey'>>>[]): void {
    this.store$.update(...reducers);
  }

  query<TR>(selector: Query<EntitiesState<EntitiesRef<'entities', 'ids', 'idKey'>>, TR>): TR {
    return this.store$.query(selector);
  }
}
