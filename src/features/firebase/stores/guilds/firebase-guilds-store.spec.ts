import { FirebaseGuildsStore } from './firebase-guilds-store';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';

describe(`FirebaseGuildsStore`, (): void => {
  let service: FirebaseGuildsStore;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsStore service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsStore.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsStore));
    });

    it(`should return the created FirebaseGuildsStore service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsStore.getInstance();

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

    it(`should notify the FirebaseGuildsStore service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsStore();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_GUILDS_STORE);
    });
  });
});
