import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { InitService } from "./init.service";

describe(`InitService`, (): void => {
  let service: InitService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Init service`, (): void => {
      expect.assertions(1);

      service = InitService.getInstance();

      expect(service).toStrictEqual(expect.any(InitService));
    });

    it(`should return the created Init service`, (): void => {
      expect.assertions(1);

      const result = InitService.getInstance();

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

    it(`should notify the Init service creation`, (): void => {
      expect.assertions(2);

      service = new InitService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.INIT_SERVICE
      );
    });
  });
});
