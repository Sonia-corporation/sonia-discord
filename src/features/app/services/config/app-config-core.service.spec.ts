import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { AppConfigCoreService } from "./app-config-core.service";

describe(`AppConfigCoreService`, (): void => {
  let service: AppConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a AppConfigCore service`, (): void => {
      expect.assertions(1);

      service = AppConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(AppConfigCoreService));
    });

    it(`should return the created AppConfigCore service`, (): void => {
      expect.assertions(1);

      const result = AppConfigCoreService.getInstance();

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

    it(`should notify the AppConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new AppConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.APP_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should have a first release date`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.firstReleaseDate).toStrictEqual(`2020-03-24T00:00:00.000Z`);
  });

  it(`should have a unknown initialization date`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.initializationDate).toStrictEqual(`unknown`);
  });

  it(`should not be in a production state`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.isProduction).toStrictEqual(false);
  });

  it(`should have a unknown release date`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.releaseDate).toStrictEqual(`unknown`);
  });

  it(`should not have some release notes`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.releaseNotes).toStrictEqual(``);
  });

  it(`should have a total of release count to 0`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.totalReleaseCount).toStrictEqual(0);
  });

  it(`should have an unknown version`, (): void => {
    expect.assertions(1);

    service = AppConfigCoreService.getInstance();

    expect(service.version).toStrictEqual(`unknown`);
  });
});
