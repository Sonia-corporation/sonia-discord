import { of } from "rxjs";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { FirebaseGuildsStore } from "../firebase-guilds-store";
import { FirebaseGuildsStoreQuery } from "./firebase-guilds-store.query";

describe(`FirebaseGuildsStoreQuery`, (): void => {
  let service: FirebaseGuildsStoreQuery;
  let coreEventService: CoreEventService;
  let firebaseGuildsStore: FirebaseGuildsStore;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsStore = FirebaseGuildsStore.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsStore query`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsStoreQuery.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsStoreQuery));
    });

    it(`should return the created FirebaseGuildsStore query`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsStoreQuery.getInstance();

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

    it(`should notify the FirebaseGuildsStore query creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsStoreQuery(firebaseGuildsStore);

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_STORE_QUERY
      );
    });
  });

  describe(`wasLoaded()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsStoreQuery(firebaseGuildsStore);

      jest.spyOn(service, `selectLoading`).mockReturnValue(of(true));
    });

    describe(`when the store is no longer loading`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.wasLoaded();

        expect(result).toStrictEqual(true);
      });
    });
  });
});
