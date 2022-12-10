import { FirebaseDmsStore } from './firebase-dms-store';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { addEntities, getEntity } from '@ngneat/elf-entities';

describe(`FirebaseDmsStore`, (): void => {
  let service: FirebaseDmsStore;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsStore service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsStore.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsStore));
    });

    it(`should return the created FirebaseDmsStore service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsStore.getInstance();

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

      service = new FirebaseDmsStore();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_DMS_STORE);
    });
  });

  describe(`update()`, (): void => {
    let store$UpdateSpy: jest.SpyInstance;

    beforeEach((): void => {
      store$UpdateSpy = jest.spyOn(service.store$, `update`).mockImplementation();
    });

    it(`should update the element(s) in the store with the given reducer`, (): void => {
      expect.assertions(2);

      service.update(addEntities([]));

      expect(store$UpdateSpy).toHaveBeenCalledTimes(1);
      expect(store$UpdateSpy).toHaveBeenCalledWith(expect.toBeFunction());
    });
  });

  describe(`query()`, (): void => {
    let store$QuerySpy: jest.SpyInstance;

    beforeEach((): void => {
      store$QuerySpy = jest.spyOn(service.store$, `query`).mockImplementation();
    });

    it(`should select the element(s) in the store with the given selector`, (): void => {
      expect.assertions(2);

      service.query(getEntity(`dummy-id`));

      expect(store$QuerySpy).toHaveBeenCalledTimes(1);
      expect(store$QuerySpy).toHaveBeenCalledWith(expect.toBeFunction());
    });
  });
});
