import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseGuildsService`, (): void => {
  let service: FirebaseGuildsService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuilds service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsService));
    });

    it(`should return the created FirebaseGuilds service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsService.getInstance();

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

    it(`should notify the FirebaseGuilds service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_SERVICE
      );
    });
  });
});
