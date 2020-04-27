import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { ServerService } from "./server.service";

describe(`ServerService`, (): void => {
  let service: ServerService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Server service`, (): void => {
      expect.assertions(1);

      service = ServerService.getInstance();

      expect(service).toStrictEqual(expect.any(ServerService));
    });

    it(`should return the created Server service`, (): void => {
      expect.assertions(1);

      const result = ServerService.getInstance();

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

    it(`should notify the Server service creation`, (): void => {
      expect.assertions(2);

      service = new ServerService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.SERVER_SERVICE
      );
    });
  });
});
