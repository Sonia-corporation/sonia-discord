import { CoreEventService } from "./core-event.service";
import { CoreService } from "./core.service";

describe(`CoreService`, (): void => {
  let service: CoreService;

  describe(`getInstance()`, (): void => {
    it(`should create a Core service`, (): void => {
      expect.assertions(1);

      service = CoreService.getInstance();

      expect(service).toStrictEqual(expect.any(CoreService));
    });

    it(`should return the created Core service`, (): void => {
      expect.assertions(1);

      const result = CoreService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`init()`, (): void => {
    let coreEventServiceGetInstanceSy: jest.SpyInstance;

    beforeEach((): void => {
      service = CoreService.getInstance();

      coreEventServiceGetInstanceSy = jest.spyOn(
        CoreEventService,
        `getInstance`
      );
    });

    it(`should create the CoreEvent service`, (): void => {
      expect.assertions(2);

      service.init();

      expect(coreEventServiceGetInstanceSy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceGetInstanceSy).toHaveBeenCalledWith();
    });
  });
});
