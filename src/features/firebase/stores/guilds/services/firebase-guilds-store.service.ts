import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { FirebaseGuildsService } from '../../../services/guilds/firebase-guilds.service';
import { IFirebaseGuild } from '../../../types/guilds/firebase-guild';
import { FirebaseAbstractStoreService } from '../../services/firebase-abstract-store.service';
import { FirebaseGuildsStore } from '../firebase-guilds-store';
import { emitOnce } from '@ngneat/elf';
import { addEntities, deleteAllEntities, getEntity, upsertEntities } from '@ngneat/elf-entities';
import { Snowflake } from 'discord.js';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class FirebaseGuildsStoreService extends FirebaseAbstractStoreService<IFirebaseGuild> {
  private static _instance: FirebaseGuildsStoreService;

  public static getInstance(): FirebaseGuildsStoreService {
    if (_.isNil(FirebaseGuildsStoreService._instance)) {
      FirebaseGuildsStoreService._instance = new FirebaseGuildsStoreService();
    }

    return FirebaseGuildsStoreService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_STORE_SERVICE);
  }

  public init(): void {
    this._registerSubscription(this._watchFirebaseGuilds$().subscribe());
  }

  public addOrUpdateEntities(entities: IFirebaseGuild[]): void {
    FirebaseGuildsStore.getInstance().update(upsertEntities(entities));
  }

  public addEntities(entities: IFirebaseGuild[]): void {
    FirebaseGuildsStore.getInstance().update(addEntities(entities));
  }

  public removeAllEntities(): void {
    FirebaseGuildsStore.getInstance().update(deleteAllEntities());
  }

  public getEntity(id: Snowflake): IFirebaseGuild | undefined {
    return FirebaseGuildsStore.getInstance().query(getEntity(id));
  }

  private _watchFirebaseGuilds$(): Observable<IFirebaseGuild[]> {
    return FirebaseGuildsService.getInstance()
      .onGuildsChange$()
      .pipe(
        tap({
          next: (entities: IFirebaseGuild[]): void => {
            emitOnce((): void => {
              this.removeAllEntities();
              this.addEntities(entities);
            });
          },
        })
      );
  }
}
