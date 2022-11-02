import { AbstractQueryEntityService } from '../../../../../classes/stores/abstract-query-entity.service';
import { ONE_EMITTER } from '../../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { StoreNameEnum } from '../../../../../enums/store-name.enum';
import { FirebaseGuildsStore } from '../firebase-guilds-store';
import { IFirebaseGuildState } from '../types/firebase-guild-state';
import { StoreConfig } from '@datorama/akita';
import _ from 'lodash';
import { firstValueFrom } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@StoreConfig({
  name: StoreNameEnum.GUILDS,
})
export class FirebaseGuildsStoreQuery extends AbstractQueryEntityService<FirebaseGuildsStore, IFirebaseGuildState> {
  private static _instance: FirebaseGuildsStoreQuery;

  public static getInstance(): FirebaseGuildsStoreQuery {
    if (_.isNil(FirebaseGuildsStoreQuery._instance)) {
      FirebaseGuildsStoreQuery._instance = new FirebaseGuildsStoreQuery(FirebaseGuildsStore.getInstance());
    }

    return FirebaseGuildsStoreQuery._instance;
  }

  public constructor(firebaseGuildsStore: FirebaseGuildsStore) {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE_QUERY, firebaseGuildsStore);
  }

  public wasLoaded(): Promise<true> {
    return firstValueFrom(
      this.selectLoading().pipe(
        filter((isLoaded: Readonly<boolean>): boolean => _.isEqual(isLoaded, true)),
        take(ONE_EMITTER),
        map((): true => true)
      )
    );
  }
}
