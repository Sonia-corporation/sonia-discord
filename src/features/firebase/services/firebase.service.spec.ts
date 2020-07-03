import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { FirebaseAppService } from "./firebase-app.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import { FirebaseService } from "./firebase.service";

describe(`FirebaseService`, (): void => {
  let service: FirebaseService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Firebase service`, (): void => {
      expect.assertions(1);

      service = FirebaseService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseService));
    });

    it(`should return the created Firebase service`, (): void => {
      expect.assertions(1);

      const result = FirebaseService.getInstance();

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

    it(`should notify the Firebase service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let firebaseAppService: FirebaseAppService;
    let firebaseGuildsService: FirebaseGuildsService;

    let firebaseAppServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseAppServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetInstanceInitSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseService();
      firebaseAppService = createMock<FirebaseAppService>();
      firebaseGuildsService = createMock<FirebaseGuildsService>();

      firebaseAppServiceGetInstanceSpy = jest
        .spyOn(FirebaseAppService, `getInstance`)
        .mockReturnValue(firebaseAppService);
      firebaseAppServiceGetInstanceInitSpy = jest
        .spyOn(firebaseAppService, `init`)
        .mockImplementation();
      firebaseGuildsServiceGetInstanceSpy = jest
        .spyOn(FirebaseGuildsService, `getInstance`)
        .mockReturnValue(firebaseGuildsService);
      firebaseGuildsServiceGetInstanceInitSpy = jest
        .spyOn(firebaseGuildsService, `init`)
        .mockImplementation();
    });

    it(`should create the FirebaseApp service`, (): void => {
      expect.assertions(1);

      service.init();

      expect(firebaseAppServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseApp service`, (): void => {
      expect.assertions(3);

      service.init();

      expect(firebaseAppServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseAppServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseAppServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create the FirebaseGuilds service`, (): void => {
      expect.assertions(1);

      service.init();

      expect(firebaseGuildsServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseGuilds service`, (): void => {
      expect.assertions(3);

      service.init();

      expect(firebaseGuildsServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseGuildsServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });
  });
});
