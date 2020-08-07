import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { FirebaseGuildsStoreService } from "./firebase-guilds-store.service";

describe(`FirebaseGuildsStoreService`, (): void => {
  let service: FirebaseGuildsStoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsStore service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsStoreService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsStoreService));
    });

    it(`should return the created FirebaseGuildsStore service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsStoreService.getInstance();

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

      service = new FirebaseGuildsStoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_STORE_SERVICE
      );
    });
  });
});
