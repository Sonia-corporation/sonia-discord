import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ProfileConfigCoreService } from "./profile-config-core.service";

describe(`ProfileConfigCoreService`, (): void => {
  let service: ProfileConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a ProfileConfigCore service`, (): void => {
      expect.assertions(1);

      service = ProfileConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(ProfileConfigCoreService));
    });

    it(`should return the created ProfileConfigCore service`, (): void => {
      expect.assertions(1);

      const result = ProfileConfigCoreService.getInstance();

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

    it(`should notify the ProfileConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new ProfileConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.PROFILE_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should not have a Discord id`, (): void => {
    expect.assertions(1);

    service = ProfileConfigCoreService.getInstance();

    expect(service.discordId).toBeNull();
  });

  it(`should not have a nickname`, (): void => {
    expect.assertions(1);

    service = ProfileConfigCoreService.getInstance();

    expect(service.nickname).toBeNull();
  });
});
