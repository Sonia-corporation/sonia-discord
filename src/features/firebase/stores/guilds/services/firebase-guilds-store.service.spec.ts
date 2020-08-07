import { Subject } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { IFirebaseGuild } from "../../../interfaces/firebase-guild";
import { FirebaseGuildsService } from "../../../services/firebase-guilds.service";
import { FirebaseGuildsStore } from "../firebase-guilds-store";
import { FirebaseGuildsStoreService } from "./firebase-guilds-store.service";

describe(`FirebaseGuildsStoreService`, (): void => {
  let service: FirebaseGuildsStoreService;
  let coreEventService: CoreEventService;
  let firebaseGuildsService: FirebaseGuildsService;
  let firebaseGuildsStore: FirebaseGuildsStore;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    firebaseGuildsStore = FirebaseGuildsStore.getInstance();
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

  describe(`init()`, (): void => {
    let onGuildsChange$: Subject<IFirebaseGuild[]>;
    let firebaseGuilds: IFirebaseGuild[];

    let firebaseGuildsServiceOnGuildsChange$Spy: jest.SpyInstance;
    let removeAllEntitiesSpy: jest.SpyInstance;
    let addEntitiesSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsStoreService();
      onGuildsChange$ = new Subject<IFirebaseGuild[]>();
      firebaseGuilds = createMock<IFirebaseGuild[]>();

      firebaseGuildsServiceOnGuildsChange$Spy = jest
        .spyOn(firebaseGuildsService, `onGuildsChange$`)
        .mockReturnValue(onGuildsChange$);
      removeAllEntitiesSpy = jest
        .spyOn(service, `removeAllEntities`)
        .mockImplementation();
      addEntitiesSpy = jest.spyOn(service, `addEntities`).mockImplementation();
    });

    it(`should watch the Firebase guilds changes`, (): void => {
      expect.assertions(2);

      service.init();
      onGuildsChange$.next(firebaseGuilds);

      expect(firebaseGuildsServiceOnGuildsChange$Spy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceOnGuildsChange$Spy).toHaveBeenCalledWith();
    });

    describe(`when an error occurred when watching the Firebase guilds`, (): void => {
      it(`should watch the Firebase guilds changes`, (): void => {
        expect.assertions(2);

        service.init();
        onGuildsChange$.error(new Error(`error`));

        expect(firebaseGuildsServiceOnGuildsChange$Spy).toHaveBeenCalledTimes(
          1
        );
        expect(firebaseGuildsServiceOnGuildsChange$Spy).toHaveBeenCalledWith();
      });

      it(`should not remove all the Firebase guilds from the store`, (): void => {
        expect.assertions(1);

        service.init();
        onGuildsChange$.error(new Error(`error`));

        expect(removeAllEntitiesSpy).not.toHaveBeenCalled();
      });

      it(`should not add the new Firebase guilds into the store`, (): void => {
        expect.assertions(1);

        service.init();
        onGuildsChange$.error(new Error(`error`));

        expect(addEntitiesSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase guilds changed`, (): void => {
      it(`should remove all the Firebase guilds from the store`, (): void => {
        expect.assertions(2);

        service.init();
        onGuildsChange$.next(firebaseGuilds);

        expect(removeAllEntitiesSpy).toHaveBeenCalledTimes(1);
        expect(removeAllEntitiesSpy).toHaveBeenCalledWith();
      });

      it(`should add the new Firebase guilds into the store`, (): void => {
        expect.assertions(2);

        service.init();
        onGuildsChange$.next(firebaseGuilds);

        expect(addEntitiesSpy).toHaveBeenCalledTimes(1);
        expect(addEntitiesSpy).toHaveBeenCalledWith(firebaseGuilds);
      });
    });
  });

  describe(`addOrUpdateEntities()`, (): void => {
    let firebaseGuilds: IFirebaseGuild[];

    let firebaseGuildsStoreUpsertManySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsStoreService();
      firebaseGuilds = createMock<IFirebaseGuild[]>();

      firebaseGuildsStoreUpsertManySpy = jest
        .spyOn(firebaseGuildsStore, `upsertMany`)
        .mockImplementation();
    });

    it(`should update or add the given Firebase guilds into the store`, (): void => {
      expect.assertions(2);

      service.addOrUpdateEntities(firebaseGuilds);

      expect(firebaseGuildsStoreUpsertManySpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsStoreUpsertManySpy).toHaveBeenCalledWith(
        firebaseGuilds
      );
    });
  });

  describe(`addEntities()`, (): void => {
    let firebaseGuilds: IFirebaseGuild[];

    let firebaseGuildsStoreAddSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsStoreService();
      firebaseGuilds = createMock<IFirebaseGuild[]>();

      firebaseGuildsStoreAddSpy = jest
        .spyOn(firebaseGuildsStore, `add`)
        .mockImplementation();
    });

    it(`should add the given Firebase guilds into the store`, (): void => {
      expect.assertions(2);

      service.addEntities(firebaseGuilds);

      expect(firebaseGuildsStoreAddSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsStoreAddSpy).toHaveBeenCalledWith(firebaseGuilds);
    });
  });

  describe(`removeAllEntities()`, (): void => {
    let firebaseGuildsStoreRemoveSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsStoreService();

      firebaseGuildsStoreRemoveSpy = jest
        .spyOn(firebaseGuildsStore, `remove`)
        .mockImplementation();
    });

    it(`should remove all the Firebase guilds in the store`, (): void => {
      expect.assertions(2);

      service.removeAllEntities();

      expect(firebaseGuildsStoreRemoveSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsStoreRemoveSpy).toHaveBeenCalledWith();
    });
  });
});
