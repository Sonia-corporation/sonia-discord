import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { FirebaseDmsService } from '../../../services/dms/firebase-dms.service';
import { IFirebaseDm } from '../../../types/dms/firebase-dm';
import { FirebaseAbstractStoreService } from '../../services/firebase-abstract-store.service';
import { FirebaseDmsStore } from '../firebase-dms-store';
import { emitOnce } from '@ngneat/elf';
import { addEntities, deleteAllEntities, getEntity, upsertEntities } from '@ngneat/elf-entities';
import { Snowflake } from 'discord.js';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class FirebaseDmsStoreService extends FirebaseAbstractStoreService<IFirebaseDm> {
  private static _instance: FirebaseDmsStoreService;

  public static getInstance(): FirebaseDmsStoreService {
    if (_.isNil(FirebaseDmsStoreService._instance)) {
      FirebaseDmsStoreService._instance = new FirebaseDmsStoreService();
    }

    return FirebaseDmsStoreService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_STORE_SERVICE);
  }

  public init(): void {
    this._registerSubscription(this._watchFirebaseDms$().subscribe());
  }

  public addOrUpdateEntities(entities: IFirebaseDm[]): void {
    FirebaseDmsStore.getInstance().update(upsertEntities(entities));
  }

  public addEntities(entities: IFirebaseDm[]): void {
    FirebaseDmsStore.getInstance().update(addEntities(entities));
  }

  public removeAllEntities(): void {
    FirebaseDmsStore.getInstance().update(deleteAllEntities());
  }

  public getEntity(id: Snowflake): IFirebaseDm | undefined {
    return FirebaseDmsStore.getInstance().query(getEntity(id));
  }

  private _watchFirebaseDms$(): Observable<IFirebaseDm[]> {
    return FirebaseDmsService.getInstance()
      .onDmsChange$()
      .pipe(
        tap({
          next: (entities: IFirebaseDm[]): void => {
            emitOnce((): void => {
              this.removeAllEntities();
              this.addEntities(entities);
            });
          },
        })
      );
  }
}
