import { FirebaseDmsStoreService } from './firebase-dms-store.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { FirebaseDmsService } from '../../../services/dms/firebase-dms.service';
import { IFirebaseDm } from '../../../types/dms/firebase-dm';
import { FirebaseDmsStore } from '../firebase-dms-store';
import * as ElfEntitiesModule from '@ngneat/elf-entities';
import { Snowflake } from 'discord.js';
import { Subject } from 'rxjs';
import { createHydratedMock, createMock } from 'ts-auto-mock';

describe(`FirebaseDmsStoreService`, (): void => {
  let service: FirebaseDmsStoreService;
  let coreEventService: CoreEventService;
  let firebaseDmsService: FirebaseDmsService;
  let firebaseDmsStore: FirebaseDmsStore;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseDmsService = FirebaseDmsService.getInstance();
    firebaseDmsStore = FirebaseDmsStore.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsStore service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsStoreService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsStoreService));
    });

    it(`should return the created FirebaseDmsStore service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsStoreService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the FirebaseDmsStore service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsStoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_DMS_STORE_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let onDmsChange$: Subject<IFirebaseDm[]>;
    let firebaseDms: IFirebaseDm[];

    let firebaseDmsServiceOnDmsChange$Spy: jest.SpyInstance;
    let removeAllEntitiesSpy: jest.SpyInstance;
    let addEntitiesSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsStoreService();
      onDmsChange$ = new Subject<IFirebaseDm[]>();
      firebaseDms = createMock<IFirebaseDm[]>();

      firebaseDmsServiceOnDmsChange$Spy = jest.spyOn(firebaseDmsService, `onDmsChange$`).mockReturnValue(onDmsChange$);
      removeAllEntitiesSpy = jest.spyOn(service, `removeAllEntities`).mockImplementation();
      addEntitiesSpy = jest.spyOn(service, `addEntities`).mockImplementation();
    });

    it(`should watch the Firebase DMs changes`, (): void => {
      expect.assertions(2);

      service.init();
      onDmsChange$.next(firebaseDms);

      expect(firebaseDmsServiceOnDmsChange$Spy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsServiceOnDmsChange$Spy).toHaveBeenCalledWith();
    });

    describe(`when an error occurred when watching the Firebase DMs`, (): void => {
      it(`should watch the Firebase DMs changes`, (): void => {
        expect.assertions(2);

        service.init();
        onDmsChange$.error(new Error(`error`));

        expect(firebaseDmsServiceOnDmsChange$Spy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsServiceOnDmsChange$Spy).toHaveBeenCalledWith();
      });

      it(`should not remove all the Firebase DMs from the store`, (): void => {
        expect.assertions(1);

        service.init();
        onDmsChange$.error(new Error(`error`));

        expect(removeAllEntitiesSpy).not.toHaveBeenCalled();
      });

      it(`should not add the new Firebase DMs into the store`, (): void => {
        expect.assertions(1);

        service.init();
        onDmsChange$.error(new Error(`error`));

        expect(addEntitiesSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase DMs changed`, (): void => {
      it(`should remove all the Firebase DMs from the store`, (): void => {
        expect.assertions(2);

        service.init();
        onDmsChange$.next(firebaseDms);

        expect(removeAllEntitiesSpy).toHaveBeenCalledTimes(1);
        expect(removeAllEntitiesSpy).toHaveBeenCalledWith();
      });

      it(`should add the new Firebase DMs into the store`, (): void => {
        expect.assertions(2);

        service.init();
        onDmsChange$.next(firebaseDms);

        expect(addEntitiesSpy).toHaveBeenCalledTimes(1);
        expect(addEntitiesSpy).toHaveBeenCalledWith(firebaseDms);
      });
    });
  });

  describe(`addOrUpdateEntities()`, (): void => {
    let firebaseDms: IFirebaseDm[];

    let firebaseDmsStoreUpdateSpy: jest.SpyInstance;
    let upsertEntitiesSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsStoreService();
      firebaseDms = createMock<IFirebaseDm[]>();

      firebaseDmsStoreUpdateSpy = jest.spyOn(firebaseDmsStore, `update`).mockImplementation();
      upsertEntitiesSpy = jest.spyOn(ElfEntitiesModule, `upsertEntities`).mockImplementation();
    });

    it(`should update or add the given Firebase guilds into the store`, (): void => {
      expect.assertions(3);

      service.addOrUpdateEntities(firebaseDms);

      expect(firebaseDmsStoreUpdateSpy).toHaveBeenCalledTimes(1);
      expect(upsertEntitiesSpy).toHaveBeenCalledTimes(1);
      expect(upsertEntitiesSpy).toHaveBeenCalledWith(firebaseDms);
    });
  });

  describe(`addEntities()`, (): void => {
    let firebaseDms: IFirebaseDm[];

    let firebaseDmsStoreUpdateSpy: jest.SpyInstance;
    let addEntitiesSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsStoreService();
      firebaseDms = createMock<IFirebaseDm[]>();

      firebaseDmsStoreUpdateSpy = jest.spyOn(firebaseDmsStore, `update`).mockImplementation();
      addEntitiesSpy = jest.spyOn(ElfEntitiesModule, `addEntities`).mockImplementation();
    });

    it(`should add the given Firebase DMs into the store`, (): void => {
      expect.assertions(3);

      service.addEntities(firebaseDms);

      expect(firebaseDmsStoreUpdateSpy).toHaveBeenCalledTimes(1);
      expect(addEntitiesSpy).toHaveBeenCalledTimes(1);
      expect(addEntitiesSpy).toHaveBeenCalledWith(firebaseDms);
    });
  });

  describe(`removeAllEntities()`, (): void => {
    let firebaseDmsStoreUpdateSpy: jest.SpyInstance;
    let deleteAllEntitiesSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsStoreService();

      firebaseDmsStoreUpdateSpy = jest.spyOn(firebaseDmsStore, `update`).mockImplementation();
      deleteAllEntitiesSpy = jest.spyOn(ElfEntitiesModule, `deleteAllEntities`).mockImplementation();
    });

    it(`should remove all the Firebase DMs in the store`, (): void => {
      expect.assertions(3);

      service.removeAllEntities();

      expect(firebaseDmsStoreUpdateSpy).toHaveBeenCalledTimes(1);
      expect(deleteAllEntitiesSpy).toHaveBeenCalledTimes(1);
      expect(deleteAllEntitiesSpy).toHaveBeenCalledWith();
    });
  });

  describe(`getEntity()`, (): void => {
    let id: Snowflake;
    let firebaseDm: IFirebaseDm;

    let firebaseDmsStoreQuerySpy: jest.SpyInstance;
    let getEntitySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsStoreService();
      id = `dummy-id`;
      firebaseDm = createHydratedMock<IFirebaseDm>();

      firebaseDmsStoreQuerySpy = jest.spyOn(firebaseDmsStore, `query`).mockReturnValue(firebaseDm);
      getEntitySpy = jest.spyOn(ElfEntitiesModule, `getEntity`).mockImplementation();
    });

    it(`should return the DM by id`, (): void => {
      expect.assertions(4);

      const result = service.getEntity(id);

      expect(firebaseDmsStoreQuerySpy).toHaveBeenCalledTimes(1);
      expect(getEntitySpy).toHaveBeenCalledTimes(1);
      expect(getEntitySpy).toHaveBeenCalledWith(id);
      expect(result).toStrictEqual(firebaseDm);
    });
  });
});
