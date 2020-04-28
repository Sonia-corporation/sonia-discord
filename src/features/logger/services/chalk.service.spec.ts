import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { ChalkService } from "./chalk.service";

describe(`ChalkService`, (): void => {
  let service: ChalkService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Chalk service`, (): void => {
      expect.assertions(1);

      service = ChalkService.getInstance();

      expect(service).toStrictEqual(expect.any(ChalkService));
    });

    it(`should return the created Chalk service`, (): void => {
      expect.assertions(1);

      const result = ChalkService.getInstance();

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

    it(`should notify the Chalk service creation`, (): void => {
      expect.assertions(2);

      service = new ChalkService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.CHALK_SERVICE
      );
    });
  });
});
